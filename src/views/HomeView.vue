<template>
  <div class="home">
    <v-row>
      <v-col cols="12">
        <UpperCard :items="upperCardItems" />
      </v-col>
      <!-- <v-col cols="4">
        <PendingTasks :items="pendingTasksItems" />
      </v-col> -->
    </v-row>
    <!-- <v-row>
      <v-col cols="6">
        <AssignmentChart />
      </v-col>
      <v-col cols="6">
        <TasksChart />
      </v-col>
    </v-row> -->
    <v-row>
      <v-col cols="8">
        <CompletedTasks :items="completedTasksItems" />
      </v-col>
      <v-col cols="4">
        <MyTasks />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import PendingTasks from '@/components/home/PendingTasks.vue'
import AssignmentChart from '@/components/home/AssignmentChart.vue'
import TasksChart from '@/components/home/TasksChart.vue'
import MyTasks from '@/components/home/MyTasks.vue'
import UpperCard from '@/components/home/UpperCards.vue'
import CompletedTasks from '@/components/home/CompletedTasks.vue'
import { ref } from 'vue'

const upperCardItems = ref([
  {
    title: 'Total Projects',
    count: '8',
    percentage: '+0,5%',
    icon: 'Icon.svg',
    background: '#FFDDCE'
  },
  {
    title: 'Completed',
    count: '5',
    percentage: '+1,2%',
    icon: 'completed.svg',
    background: '#DCFCE7'
  },
  {
    title: 'Pending',
    count: '2',
    percentage: '+5%',
    icon: 'pending.svg',
    background: '#FFF4DE'
  },
  {
    title: 'Rejected',
    count: '1',
    percentage: '+1,7%',
    icon: 'rejected.svg',
    background: '#FFE2E5'
  }
])

const pendingTasksItems = ref([
  {
    title: 'Videos',
    background: '#FF4F00',
    percentage: '35'
  },
  {
    title: 'Plans',
    background: '#3CD856',
    percentage: '30'
  },
  {
    title: 'Projects',
    background: '#FF947A',
    percentage: '70'
  },
  {
    title: 'Reports',
    background: '#FA5A7D',
    percentage: '40'
  },
  {
    title: 'Finance',
    background: '#0095FF',
    percentage: '10'
  },
  {
    title: 'Designs',
    background: '#4339F2',
    percentage: '100'
  }
])
const completedTasksItems = ref([
  {
    title: 'Videos',
    color: '#FF4F00',
    percentage: '35',
    bg: '#FFDDCE'
  },
  {
    title: 'Plans',
    color: '#3CD856',
    percentage: '30',
    bg: '#DCFCE7'
  },
  {
    title: 'Projects',
    color: '#FF947A',
    percentage: '70',
    bg: '#FFF4DE'
  },
  {
    title: 'Reports',
    color: '#FA5A7D',
    percentage: '40',
    bg: '#FFE2E5'
  },
  {
    title: 'Designs',
    color: '#4339F2',
    percentage: '20',
    bg: '#CCF8FE'
  }
])
</script>
