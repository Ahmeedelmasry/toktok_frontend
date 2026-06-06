import { defineStore } from 'pinia'
import { useMainStore } from '@/stores/index.js'
import ModuleService from '@/services/client.js'

export const useClientStore = defineStore('clientStore', {
  state: () => ({
    items: {},
    meta: {
      page: 1,
      limit: 10
    }
  }),
  actions: {
    async doGetItems() {
      try {
        const { data } = await ModuleService.get(this.meta)
        this.items = data
        return true
      } catch (error) {
        return false
      }
    },
    async doAddItem(body) {
      try {
        const { data } = await ModuleService.create(body)
        useMainStore().callResponse(true, data.message, 1)
        return true
      } catch (error) {
        return false
      }
    },
    async sortItem(id, sort_type) {
      try {
        const { data } = await ModuleService.sort(id, sort_type)
        useMainStore().callResponse(true, data.message, 1)
        return true
      } catch (error) {
        return false
      }
    },
    async doUpdateItem(body, id) {
      try {
        const { data } = await ModuleService.update(body, id)
        useMainStore().callResponse(true, data.message, 1)
        return true
      } catch (error) {
        return false
      }
    }
  }
})
