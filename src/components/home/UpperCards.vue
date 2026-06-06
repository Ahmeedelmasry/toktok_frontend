<template>
  <div class="upper-cards">
    <v-card rounded="xl" class="pa-5" elevation="0">
      <v-row class="align-center">
        <v-col cols="6" class="d-flex align-center ga-3">
          <div class="img">
            <!-- <img src="/images/dashboard/avatar.svg" alt="" /> -->
          </div>
          <div class="user">
            <div class="title weight-4">Welcome</div>
            <div class="name font-14 weight-3" style="color: #9094a0">
              {{ authStore().loggerData.userName }}
            </div>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="parent d-flex justify-end ga-3 align-center text-center">
            <div class="date_box">
              <div
                class="weight-5 font-20 pa-2 rounded-lg d-flex align-center justify-center"
                style="background-color: #ff4f00; color: white; width: 50px; height: 50px"
              >
                02
              </div>
              <div class="font-12 weight-4 mt-1">Months</div>
            </div>
            <div class="date_box">
              <div
                class="weight-5 font-20 pa-2 rounded-lg d-flex align-center justify-center"
                style="background-color: #000000; color: white; width: 50px; height: 50px"
              >
                23
              </div>
              <div class="font-12 weight-4 mt-1">Days</div>
            </div>
            <div class="date_box">
              <div
                class="weight-5 font-20 pa-2 rounded-lg d-flex align-center justify-center"
                style="background-color: #3c7a91; color: white; width: 50px; height: 50px"
              >
                12
              </div>
              <div class="font-12 weight-4 mt-1">Hours</div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" v-for="(item, i) in items" :key="i">
          <v-card elevation="0" rounded="xl" class="pa-5 py-8" :color="item.background">
            <img :src="`/images/dashboard/${item.icon}`" alt="" />
            <div class="count font-20 weight-5 ps-1 mt-2">{{ item.count }}</div>
            <div class="total mt-2">{{ item.title }}</div>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup>
import { authStore } from '@/stores/auth/auth.js'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>
