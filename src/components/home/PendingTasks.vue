<template>
  <div class="pending_tasks">
    <v-card rounded="xl" class="pa-5 pb-8" elevation="0">
      <div class="title font-14 weight-4">Pending Tasks</div>
      <v-row class="mt-1">
        <v-col cols="12" v-for="(item, i) in items" :key="i" class="pb-1">
          <div
            class="task_title d-flex justify-space-between align-center"
            style="transform: translateY(-2px)"
          >
            <span>{{ item.title }}</span>
            <span :style="{ color: item.background }">{{
              item.percentage
            }}</span>
          </div>
          <v-progress-linear
            :color="item.background"
            :model-value="item.percentage"
            height="6.70"
          ></v-progress-linear>
        </v-col>
      </v-row>
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
