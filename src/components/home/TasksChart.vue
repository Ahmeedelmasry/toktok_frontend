<template>
  <v-card class="pe-3" elevation="0" rounded="xl">
    <div class="title weight-4 pa-5">Tasks</div>
    <apexchart
      type="area"
      height="300"
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
    series: [
      {
        name: 'High - 2013',
        data: [28, 29, 33, 36, 32, 32, 33],
      },
      {
        name: 'Low - 2013',
        data: [12, 11, 14, 18, 17, 13, 13],
      },
    ],
    stroke: {
      width: 4,
      colors: ['#00838F', '#07E098'],
    },
    dataLabels: {
      style: {
        colors: ['#00838F', '#07E098'],
      },
    },
    chart: {
      type: 'area',
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: months.value,
      tooltip: {
        enabled: true,
      },
    },
    // // colors: this.data.colors,
    // fill: {
    //   type: 'gradient',
    //   gradient: {
    //     opacityFrom: 0.2,
    //     colorStops: [
    //       {
    //         offset: 0,
    //         color: '#96cced',
    //         opacity: 1,
    //       },

    //       {
    //         offset: 100,
    //         color: '#e7edf1',
    //         opacity: 1,
    //       },
    //     ],
    //   },
    // },
  }
})
</script>
