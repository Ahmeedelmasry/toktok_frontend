<template>
  <div class="menu_drawer_dashboard">
    <v-navigation-drawer
      v-model="drawer"
      elevation="1"
      :touchless="true"
      :width="350"
      class="pt-0 cart-drawer"
      id="app_drawer"
    >
      <v-card class="px-0" elevation="0">
        <v-card-title
          class="d-flex justify-space-between w-100 pl-4 pl-2"
          style="font-size: 20px; font-weight: bold"
        >
          <div class="lang_switch d-flex align-center pt-2" style="gap: 15px">
            <v-avatar size="36px" style="border: 2px solid rgb(109, 109, 109)">
              <v-icon color="blue" icon="mdi-account"></v-icon>
            </v-avatar>
            <p style="font-size: 18px; font-weight: 700">{{ authStore().loggerData.userName }}</p>
          </div>
        </v-card-title>
        <v-divider class="mt-5"></v-divider>
        <v-divider></v-divider>
        <v-list density="compact" nav class="pa-0 mt-5">
          <v-list-item
            prepend-icon="mdi-account-supervisor"
            title="Admins"
            :key="$route.name"
            :to="{ name: 'admins' }"
          >
          </v-list-item>
          <v-list-item
            prepend-icon="mdi-account-star"
            title="Clients"
            :key="$route.name"
            :to="{ name: 'clients' }"
          >
          </v-list-item>
          <v-list-item
            prepend-icon="mdi-account-file-text"
            title="Drivers"
            :key="$route.name"
            :to="{ name: 'drivers' }"
          >
          </v-list-item>
          <v-list-item
            prepend-icon="mdi-car-hatchback"
            title="Vehicles"
            :key="$route.name"
            :to="{ name: 'vehicles' }"
          >
          </v-list-item>
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ref, watch, onMounted } from 'vue'
import { useMainStore } from '@/stores'
import { authStore } from '@/stores/auth/auth.js'

// Init Stores
const mainModule = useMainStore()

// Data
const currentWidth = ref(null)
const { drawer } = storeToRefs(mainModule)

// Props
const props = defineProps(['currentWidth'])

// Watchers
watch(
  () => props.currentWidth,
  (newVal) => {
    if (newVal < 1200) {
      drawer.value = false
    } else {
      drawer.value = true
    }
  }
)

// Hooks
onMounted(() => {
  window.onresize = () => {
    currentWidth.value = window.innerWidth
  }
  currentWidth.value = window.innerWidth
  props.currentWidth < 1200 ? (drawer.value = false) : (drawer.value = true)
})
</script>

<style lang="scss">
.menu_drawer_dashboard {
  .v-list-item--nav {
    padding-top: 15px;
    padding-bottom: 15px;
    .v-list-item-title {
      font-size: 14px;
      line-height: unset;
      font-weight: bold;
      letter-spacing: 1px;
      color: rgb(53, 53, 53);
    }

    &.v-list-item--active {
      color: white !important;
      background-color: rgb(255, 145, 0);
      .v-list-item-title {
        color: white !important;
      }
      i {
        color: white !important;
      }
    }
  }
  i {
    color: rgb(53, 53, 53);
  }
  ul {
    padding-right: 0;
    padding-right: 0 !important;
  }
  ::-webkit-scrollbar {
    width: 7px !important;
  }
  ::-webkit-scrollbar-track {
    width: 7px !important;
    background-color: rgb(242, 242, 242);
  }
  ::-webkit-scrollbar-thumb {
    width: 10px !important;
    background-color: rgb(209, 209, 209);
  }
  a {
    color: rgb(41, 41, 41);
    width: 100%;
    padding: 10px 10px;
    font-size: 18px;
  }
}
.v-list-group {
  .v-list-group__header {
    padding: 15px 10px !important;
    background-color: white !important;
    &.v-list-item--active {
      .v-list-item-title {
        color: rgb(41, 41, 41) !important;
      }
      i {
        color: rgb(104, 104, 104) !important;
      }
    }
  }
  .v-list-item-title {
    padding-top: 5px !important;
    padding-bottom: 5px !important;
  }
}
// Media Queries
@media (max-width: 580px) {
  .nav-link {
    font-size: 12px;
  }
}
</style>
