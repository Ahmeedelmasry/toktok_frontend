<template>
  <v-card class="pe-3" elevation="0" rounded="xl">
    <div class="title weight-4 pa-5">My Tasks</div>
    <apexchart
      type="pie"
      height="210"
      :options="chartOpt"
      :series="chartOpt.series"
    ></apexchart>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'

const months = computed(() => {
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
})

const chartOpt = computed(() => {
  return {
    series: [30, 30, 30],
    dataLabels: {
      enabled: false, // Hides the percentage on the pie chart
    },
    chart: {
      stacked: true,
      width: 100,
      toolbar: {
        show: false,
      },
    },
    legend: {
      position: 'bottom', // Moves the labels (legend) to the bottom
      horizontalAlign: 'center', // Aligns the legend horizontally
      fontSize: '14px', // Optional: Customize font size
      markers: {
        radius: 8, // Optional: Makes the markers circular
      },
    },
    colors: ['#3cd856', '#ff947a', '#fa5a7d'],
    labels: ['Completed', 'Pending', 'Rejected'],
  }
})
</script>
