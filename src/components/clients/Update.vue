<template>
  <div class="update_banner">
    <v-dialog v-model="dialog" width="900" persistent>
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
              <v-col cols="12" md="6">
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
              <v-col cols="12" md="6">
                <div class="field_container">
                  <div class="input_parent position-relative">
                    <v-text-field
                      type="number"
                      label="Phone"
                      rounded="lg"
                      v-model="formData.phone"
                      variant="outlined"
                      :error="$v.phone.$error"
                      :errorMessages="$v.phone.$errors[0]?.$message"
                      prependInnerIcon="mdi-phone-outline"
                    ></v-text-field>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="field_container">
                  <div class="input_parent position-relative">
                    <v-text-field
                      label="Email"
                      rounded="lg"
                      v-model="formData.email"
                      variant="outlined"
                      :error="$v.email.$error"
                      :errorMessages="$v.email.$errors[0]?.$message"
                      prependInnerIcon="mdi-at"
                    ></v-text-field>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="field_container">
                  <div class="input_parent position-relative">
                    <v-text-field
                      label="Password"
                      rounded="lg"
                      v-model="formData.password"
                      variant="outlined"
                      :type="showPassword ? 'text' : 'password'"
                      :error="$v.password.$error"
                      :errorMessages="$v.password.$errors[0]?.$message"
                      prependInnerIcon="mdi-lock-outline"
                      :appendInnerIcon="`mdi-${showPassword ? 'eye-off' : 'eye'}-outline`"
                      @click:append-inner="showPassword = !showPassword"
                    ></v-text-field>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="field_container">
                  <div class="input_parent position-relative">
                    <v-text-field
                      label="Confirm Password"
                      rounded="lg"
                      v-model="formData.confirmPassword"
                      variant="outlined"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      :error="$v.confirmPassword.$error"
                      :errorMessages="$v.confirmPassword.$errors[0]?.$message"
                      prependInnerIcon="mdi-lock-outline"
                      :appendInnerIcon="`mdi-${showConfirmPassword ? 'eye-off' : 'eye'}-outline`"
                      @click:append-inner="showConfirmPassword = !showConfirmPassword"
                    ></v-text-field>
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
import { useClientStore } from '@/stores/client/store.js'

// Validator
import useVuelidator from '@vuelidate/core'
import {
  required,
  requiredIf,
  helpers,
  email,
  minLength,
  sameAs,
  maxLength
} from '@vuelidate/validators'

// Init STores
const moduleStore = useClientStore()

// Local Data
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const formData = ref({
  name: null,
  email: null,
  password: null,
  confirmPassword: null
})

const dialog = ref(false)
const btnLoading = ref(false)

const roles = computed(() => {
  return {
    name: {
      required: helpers.withMessage('Enter user name', required)
    },
    phone: {
      required: helpers.withMessage('Enter phone number', required),
      minLength: helpers.withMessage('Phone should be 11 number', minLength(11)),
      maxLength: helpers.withMessage('Phone should be 11 number', maxLength(11))
    },
    email: {
      required: helpers.withMessage('Enter email address', required),
      email: helpers.withMessage('Enter a valid email address', email)
    },
    password: {
      requiredIf: helpers.withMessage('Enter password', requiredIf(!props.toUpdate)),
      minLength: helpers.withMessage('Password should be 6 chars min length', minLength(6))
    },
    confirmPassword: {
      sameAs: helpers.withMessage('Passwords are not the same', sameAs(formData.value.password)),
      requiredIf: helpers.withMessage('Confirm password', requiredIf(!props.toUpdate))
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
    roles.value.image = {}
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
