<template>
  <div class="res_nav">
    <AppSideDrawer :currentWidth="props.currentWidth" :drawer="drawer" />
    <v-app-bar elevation="0" style="border-bottom: 1px solid #d1d1d1" height="80">
      <v-container fluid>
        <v-row class="align-center">
          <v-col cols="3" class="d-flex align-center">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="6" class="text-center img_container text-end">
            <v-avatar id="profile_menu_activator_responsive" style="cursor: pointer">
              <v-icon color="red" size="30">mdi-account-circle</v-icon>
            </v-avatar>
            <v-menu
              activator="#profile_menu_activator_responsive"
              transition="slide-y-transition"
              location="bottom right"
              offset="12"
              class="profile_menu text-start"
              width="200"
            >
              <v-list
                base-color="green"
                style="box-shadow: 0 0 20px 0 rgba(62, 28, 131, 0.1)"
                class="profile_menu_list"
              >
                <v-list-item class="top_bar">
                  <v-list-item-title
                    >Hello, <strong>{{ loggerData.userName }}</strong>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item :to="{ name: 'profile' }">
                  <v-list-item-title>
                    <v-icon class="me-2">mdi-card-account-details-outline</v-icon>
                    Profile
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="logout">
                  <v-list-item-title>
                    <v-icon class="me-2">mdi-logout-variant</v-icon>
                    Log out
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script setup>
import AppSideDrawer from './AppSideDrawer.vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useMainStore } from '@/stores'
import { authStore } from '@/stores/auth/auth.js'

// Init Stores
const mainModule = useMainStore()
const authModule = authStore()

// Data
const { drawer } = storeToRefs(mainModule)
const { loggerData, token } = storeToRefs(authModule)

// Props
const props = defineProps(['currentWidth'])

// Init Router
const router = useRouter()

// Methods
const logout = () => {
  $cookie.set('logger', undefined, new Date(Date.now()))
  setTimeout(() => {
    router.push({ name: 'signin' })
    setTimeout(() => {
      loggerData.value = {}
      token.value = null
    }, 400)
  }, 300)
}
</script>
