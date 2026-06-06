import { defineStore } from 'pinia'
import { useMainStore } from '@/stores/index.js'
import UsersService from '@/services/admin.js'

export const userStore = defineStore('userStore', {
  state: () => ({
    users: {},
    clients: {},
    meta: {
      page: 1,
      limit: 10
    }
  }),
  actions: {
    async doGetUsers() {
      try {
        const { data } = await UsersService.get(this.meta)
        this.users = data
        return true
      } catch (error) {
        return false
      }
    },
    async doAdduser(body) {
      try {
        const { data } = await UsersService.create(body)
        useMainStore().callResponse(true, data.message, 1)
        return true
      } catch (error) {
        return false
      }
    },
    async sortItem(id, sort_type) {
      try {
        const { data } = await UsersService.sort(id, sort_type)
        useMainStore().callResponse(true, data.message, 1)
        return true
      } catch (error) {
        return false
      }
    },
    async doUpdateUser(body, id) {
      try {
        const { data } = await UsersService.update(body, id)
        useMainStore().callResponse(true, data.message, 1)
        return true
      } catch (error) {
        return false
      }
    }
  }
})
