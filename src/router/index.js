import { createRouter, createWebHistory } from 'vue-router'
import { storeToRefs } from 'pinia'
import { authStore } from '@/stores/auth/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/LoginView.vue'),
      meta: {
        title: 'Fouq Panel - Sign in'
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: {
        title: 'Fouq Panel - Profile'
      }
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        title: 'Fouq Panel - Dashboard'
      }
    },
    {
      path: '/admins',
      name: 'admins',
      component: () => import('@/views/AdminView.vue'),
      meta: {
        title: 'Fouq Panel - Admins'
      }
    },
    {
      path: '/clients',
      name: 'clients',
      component: () => import('@/views/ClientView.vue'),
      meta: {
        title: 'Fouq Panel - Clients'
      }
    },
    {
      path: '/drivers',
      name: 'drivers',
      component: () => import('@/views/DriverView.vue'),
      meta: {
        title: 'Fouq Panel - Drivers'
      }
    },
    {
      path: '/vehicles',
      name: 'vehicles',
      component: () => import('@/views/VehicleView.vue'),
      meta: {
        title: 'Fouq Panel - Vehicles'
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title
  const logger = $cookie.get('logger')
  const { token } = storeToRefs(authStore())
  if (!logger) {
    if (to.name != 'signin') {
      return next({ name: 'signin' })
    }
  } else {
    if (!token.value) {
      token.value = logger
      authStore().decodeToken(token.value)
    }
    if (to.name == 'signin') {
      return next({ name: 'home' })
    }
  }
  if (to.name == 'home') {
    return next({ name: 'admins' })
  }
  return next()
})

export default router
