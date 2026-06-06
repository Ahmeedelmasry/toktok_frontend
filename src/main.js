import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from '@/plugins/vuetify'
import VueCookies from 'vue-cookies'
import axiosClient from '../HTTPClient'
import print from 'vue3-print-nb'
import VueApexCharts from 'vue3-apexcharts'

import App from './App.vue'
import router from './router'
import '@/assets/css/main.scss'

// Swiper
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

window.axios = axiosClient
window.$cookie = VueCookies

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(print)
app.use(VueApexCharts)

app.mount('#app')
