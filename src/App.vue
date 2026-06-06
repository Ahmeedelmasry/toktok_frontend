<template>
  <v-snackbar
    v-model="snackbar"
    vertical
    :color="callColor == 1 ? 'green' : 'red'"
    location="left bottom"
    :timeout="5000"
  >
    <div class="pb-2" style="font-size: 20px; font-weight: 500">
      {{ callColor == 1 ? 'Success' : 'Error' }}
    </div>

    <p style="font-size: 17px" class="mt-4">{{ callMsg }}</p>

    <template v-slot:actions>
      <v-btn :color="callColor == 1 ? 'green' : 'red'" variant="elevated" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
  <Delete />
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layout/default.vue'
import { useMainStore } from '@/stores/index.js'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Delete from '@/components/Delete/index.vue'

// Init Store
const mainModule = useMainStore()
const snackbar = ref(false)

// Init Router
const router = useRouter()

// Store Data
const { callMsg, callSuccess, callColor } = storeToRefs(mainModule)
// const { lang } = storeToRefs(langModule);

// Watch
watch(
  () => callSuccess.value,
  (newVal) => {
    if (newVal) {
      if (snackbar.value) {
        snackbar.value = false
      }
      setTimeout(() => {
        snackbar.value = true
      }, 200)
    }
  }
)

watch(
  () => snackbar.value,
  (newVal) => {
    if (!newVal) {
      mainModule.resetSnackbar()
    }
  }
)
</script>

<style lang="scss">
@font-face {
  font-family: Amman;
  src: url(./assets/fonts/cairo/Cairo-VariableFont_slnt,wght.ttf);
}

* {
  font-family: Amman, sans-serif;
}
a {
  color: unset;
}

body,
* {
  scroll-behavior: smooth !important;
}

.v-input__details {
  padding-left: 0 !important;
}

.page_pre_loader {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000000000000000000;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
}

.no_data {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.607);
}

.profile_menu_list {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  .v-list-item {
    .v-list-item-title {
      font-size: 13px !important;
      color: rgb(0, 0, 0);
    }
    &:not(:last-child) {
      border-bottom: 1px solid rgba(138, 138, 138, 0.218);
    }
  }
}

.v-data-table-headers--mobile {
  display: none;
}
</style>
