<template>
  <div class="update_banner">
    <v-dialog v-model="dialog" width="600" persistent>
      <v-card>
        <v-card-title
          class="mb-0 text-center bg-grey-lighten-3 main_title font-safe-bold"
          style="font-size: 22px"
        >
          {{ toUpdate ? 'Update Admin' : 'Add Admin' }}
        </v-card-title>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-form class="pa-5" @submit.prevent="submitData">
          <v-container>
            <v-row>
              <v-col cols="12">
                <div class="field_container">
                  <div class="input_parent position-relative">
                    <v-text-field
                      label="Name"
                      rounded="lg"
                      v-model="formData.name"
                      variant="outlined"
                      :error="$v.name.$error"
                      :errorMessages="$v.name.$errors[0]?.$message"
                      prependInnerIcon="mdi-rename-outline"
                    ></v-text-field>
                  </div>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="field_container">
                  <div class="input_parent position-relative">
                    <v-file-input
                      label="Image"
                      rounded="lg"
                      v-model="formData.file"
                      variant="outlined"
                      :error="$v.file.$error"
                      :errorMessages="$v.file.$errors[0]?.$message"
                    >
                    </v-file-input>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <div class="actions text-center mt-5">
            <v-btn
              color="red"
              class="me-3"
              width="150"
              @click="dialog = false"
              :disabled="btnLoading"
              rounded="lg"
              height="45"
              elevation="0"
              >Cancel</v-btn
            >
            <v-btn
              color="orange-darken-2"
              type="submit"
              :loading="btnLoading"
              width="150"
              rounded="lg"
              elevation="0"
              height="45"
              >Save</v-btn
            >
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useVehicleStore } from '@/stores/vehicle/store.js'

// Validator
import useVuelidator from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

// Init STores
const moduleStore = useVehicleStore()

const formData = ref({
  name: null,
  file: null
})

const dialog = ref(false)
const btnLoading = ref(false)

const roles = computed(() => {
  return {
    name: {
      required: helpers.withMessage('Enter user name', required)
    },
    file: {
      required: helpers.withMessage('Select vehicle image', required)
    }
  }
})

// Props
const props = defineProps(['openPopup', 'toUpdate'])

// emits
const emits = defineEmits(['closePopup', 'regetData'])

// Watchers
watch(
  () => dialog.value,
  (newval) => {
    if (!newval) {
      setTimeout(() => {
        emits('closePopup')
      }, 200)
    }
  }
)

// Methods
let $v = useVuelidator(roles, formData)

const submitData = async () => {
  if (props.toUpdate) {
    roles.value.file = {}
  }
  const res = await $v.value.$validate()
  if (res) {
    btnLoading.value = true
    if (props.toUpdate) {
      const data = { ...formData.value }
      for (const val of Object.entries(data)) {
        if (val[1] === null || val[1] === '') {
          delete data[val[0]]
        }
      }
      const result = await moduleStore.doUpdateItem(
        {
          ...data,
          createdAt: new Date()
        },
        props.toUpdate._id
      )

      if (result) {
        emits('regetData')
        dialog.value = false
      }
    } else {
      const result = await moduleStore.doAddItem({
        ...formData.value,
        createdAt: new Date()
      })
      if (result) {
        emits('regetData')
        dialog.value = false
      }
    }
    btnLoading.value = false
  }
}

// Hooks
onMounted(() => {
  dialog.value = props.openPopup
  if (props.toUpdate) {
    for (const val of Object.entries(props.toUpdate)) {
      formData.value[val[0]] = val[1]
    }
  }
})
</script>
