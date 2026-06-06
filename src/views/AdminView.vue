<template>
  <div class="dashboard_tests_page mb-10">
    <UsersListing :users="users" :loading="loading" @regetItems="getData()" />
  </div>
</template>

<script setup>
import { userStore } from '@/stores/admin/admin.js'
import { storeToRefs } from 'pinia'
import { authStore } from '@/stores/auth/auth.js'
import { ref, onMounted } from 'vue'
import UsersListing from '@/components/users/Listing.vue'

// Init STores
const usersModule = userStore()

// Store Data
const { users, meta } = storeToRefs(usersModule)

// Local Data
const loading = ref(true)

// Methods
const getData = async () => {
  loading.value = true
  await usersModule.doGetUsers()
  loading.value = false
}

// Hooks
onMounted(() => {
  meta.value.page = 1
  meta.value.limit = 10
  getData()
})
</script>
