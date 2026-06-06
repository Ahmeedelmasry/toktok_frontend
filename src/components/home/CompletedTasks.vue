<template>
  <div class="upper-cards">
    <v-card rounded="xl" class="pa-5" elevation="0">
      <div class="title weight-4 mb-8">Completed Tasks</div>
      <div class="labels d-flex ga-8 align-center">
        <div
          class="label d-flex align-center ga-2"
          v-for="(item, i) in items"
          :key="i"
        >
          <div
            class="color"
            style="width: 14px; height: 14px; border-radius: 50%"
            :style="{ backgroundColor: item.color }"
          ></div>
          <div class="title font-14 weight-3">{{ item.title }}</div>
        </div>
      </div>
      <div class="d-flex ga-8 align-center mt-6 flex-wrap">
        <v-card
          elevation="0"
          rounded="xl"
          class="pa-0 position-relative"
          v-for="(item, i) in items"
          :key="i"
          color="transparent"
        >
          <v-progress-circular
            size="126"
            width="12"
            :color="item.color"
            :model-value="item.percentage"
            class="position-relative"
            style="z-index: 11"
            bg-color="transparent"
          ></v-progress-circular>
          <div
            class="progress-bg position-absolute w-100 left-0 top-0 font-20 d-flex align-center justify-center"
            style="z-index: 10; height: 126px; border-radius: 50%"
            :style="{ backgroundColor: item.bg }"
          >
            {{ item.percentage }}%
          </div>
        </v-card>
      </div>
    </v-card>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
</script>
