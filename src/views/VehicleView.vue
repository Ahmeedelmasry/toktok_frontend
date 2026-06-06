<template>
  <div class="dashboard_tests_page mb-10">
    <ItemsListing :items="items" :loading="loading" @regetItems="getData()" />
  </div>
</template>

<script setup>
import { useVehicleStore } from '@/stores/vehicle/store.js'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import ItemsListing from '@/components/vehicles/Listing.vue'

// Init STores
const moduleStore = useVehicleStore()

// Store Data
const { items, meta } = storeToRefs(moduleStore)

// Local Data
const loading = ref(true)

// Methods
const getData = async () => {
  loading.value = true
  await moduleStore.doGetItems()
  loading.value = false
}

// Hooks
onMounted(() => {
  meta.value.page = 1
  meta.value.limit = 10
  getData()
})
</script>
