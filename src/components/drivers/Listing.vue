<template>
  <div class="dashboard_banners_listing">
    <v-container class="page_container" fluid>
      <v-row v-if="items" class="px-4">
        <v-col cols="12" class="section_container dashboard_table pa-0" id="printable">
          <!-- New Table -->
          <TableData
            :items="items.docs"
            :meta="meta"
            :headers="headers"
            :loading="loading"
            :slots="['index', 'createdAt', 'actions']"
            @createAction="openAdd = true"
            title="Drivers"
            :pagination="items"
            @delete="(openDelete = true), (toDelete = $event)"
            @update="(toUpdate = $event), (openUpdate = true)"
            @getData="
              (meta.limit = $event.limit || 10), (meta.page = $event.page || 1), emits('regetItems')
            "
          >
            <template #index="{ item }">
              <div class="py-1">#{{ item.order }}</div>
            </template>
            <template #createdAt="{ item }">
              <div>
                {{ moment(item.createdAt).format('DD-MM-YYYY') }}
              </div>
            </template>
            <template #actions="item">
              <div class="hide_on_print ps-5">
                <v-btn
                  :id="`actions_${item.item._id}`"
                  flat
                  :ripple="false"
                  :class="{ 'text-grey-lighten-1': item.item._id == authStore().loggerData._id }"
                  :readonly="item.item._id == authStore().loggerData._id"
                  ><v-icon>mdi-dots-vertical</v-icon></v-btn
                >
                <v-menu :activator="`#actions_${item.item._id}`" transition="slide-y-transition">
                  <v-list style="box-shadow: 0 0 20px 0 rgba(62, 28, 131, 0.1)">
                    <v-list-item class="px-0" @click="(toUpdate = item.item), (openUpdate = true)">
                      <v-icon color="blue" style="cursor: pointer">mdi-square-edit-outline</v-icon>
                      <span class="ms-2 me-5 text-body-2">Update</span>
                    </v-list-item>
                    <v-list-item class="px-0" @click="openDel(item)">
                      <v-icon color="red">mdi-delete-outline</v-icon>
                      <span class="ms-2 me-5 text-body-2">Delete</span>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </template>
          </TableData>
          <!-- New Table -->
        </v-col>
      </v-row>
    </v-container>

    <item-update
      :openPopup="openUpdate"
      @closePopup="(openUpdate = false), (toUpdate = null)"
      :toUpdate="toUpdate"
      v-if="openUpdate"
      @regetData="emits('regetItems')"
    />

    <item-update
      :openPopup="openAdd"
      @closePopup="openAdd = false"
      v-if="openAdd"
      @regetData="(meta.page = 1), emits('regetItems')"
    />
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/index.js'
import moment from 'moment'
import { authStore } from '@/stores/auth/auth'
import { ref, watch } from 'vue'
import ItemUpdate from './Update.vue'
import TableData from '@/components/shared/TableData.vue'
import { useDriverStore } from '@/stores/driver/store.js'

// Init Store
const mainModule = useMainStore()
const moduleStore = useDriverStore()

const { regetData } = storeToRefs(mainModule)
const { meta } = storeToRefs(moduleStore)

// Local Data
const openAdd = ref(false)
const openUpdate = ref(false)
const toUpdate = ref(null)
const searchWord = ref(null)
const toDelete = ref(null)
const page = ref(1)
const perPage = ref(10)

const headers = ref([
  { title: '#No', key: 'index' },
  { title: 'Name', key: 'name', width: '30%' },
  { title: 'Email', key: 'email', width: '25%' },
  { title: 'Phone', key: 'phone', width: '25%' },
  { title: 'Vehicle', key: 'vehicleType.name', width: '25%' },
  { title: 'Creation Date', key: 'createdAt', width: '25%' },
  { title: 'Actions', key: 'actions' }
])

// Props
const props = defineProps(['items', 'loading'])

// Emits
const emits = defineEmits(['regetItems'])

watch(
  () => perPage.value,
  (newVal) => {
    emits('regetItems', {
      page: page.value,
      limit: newVal,
      searchWord: searchWord.value
    })
  }
)

watch(
  () => regetData.value,
  (newVal) => {
    if (newVal) {
      emits('regetItems', {
        page: 1,
        limit: perPage.value,
        searchWord: searchWord.value
      })
    }
  }
)

// Methods
const openDel = (item) => {
  mainModule.handleErr('alert', 'Delete Item', `Are you sure you want to delete this item?`, {
    ...item,
    url: 'drivers'
  })
  toDelete.value = item
}
</script>

<style lang="scss"></style>
