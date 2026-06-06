<template>
  <v-card elevation="0" rounded="xl" class="pe-3">
    <div class="title weight-4 pa-5">Assignments</div>
    <apexchart
      type="bar"
      height="300"
      :options="chartOpt"
      :series="chartOpt.series"
    ></apexchart>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'

const months = computed(() => {
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May']
})

const chartOpt = computed(() => {
  return {
    series: [
      {
        name: 'High - 2013',
        data: [21, 22, 10, 28, 16],
      },
      {
        name: 'Low - 2013',
        data: [12, 11, 14, 18, 17],
      },
    ],
    dataLabels: {
      enabled: false,
    },
    chart: {
      type: 'area',
      stacked: false,
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
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: 17,
        barSpacing: 10,
        // borderRadius: 4,
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
