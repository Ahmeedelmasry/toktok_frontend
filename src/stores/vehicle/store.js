import { defineStore } from 'pinia'
import { useMainStore } from '@/stores/index.js'
import ModuleService from '@/services/vehicle.js'

export const useVehicleStore = defineStore('vehicleStore', {
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
        const formData = new FormData()
        formData.append('name', body.name)
        formData.append('file', body.file)
        const { data } = await ModuleService.create(formData)
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
        const formData = new FormData()
        formData.append('name', body.name)
        formData.append('file', body.file)
        const { data } = await ModuleService.update(formData, id)
        useMainStore().callResponse(true, data.message, 1)
        return true
      } catch (error) {
        return false
      }
    }
  }
})
