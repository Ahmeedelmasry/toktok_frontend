import { useMainStore } from '@/stores'
import { storeToRefs } from 'pinia'

const apiUrl = import.meta.env.VITE_API_URL

class ApiClient {
  constructor(resource) {
    this.resource = resource
  }

  get url() {
    return `${apiUrl}${this.resource}`
  }

  get(params) {
    return axios.get(this.url, {
      params: {
        ...params
      }
    })
  }

  show(id) {
    return axios.get(`${this.url}/${id}`)
  }

  create(data) {
    const { uploadProgress } = storeToRefs(useMainStore())
    return axios.post(`${this.url}`, data, {
      onUploadProgress: (progressEvent) => {
        uploadProgress.value = (progressEvent.loaded / progressEvent.total) * 100
        if (uploadProgress.value == 100) {
          uploadProgress.value = 0
        }
      }
    })
  }

  update(data, id) {
    return axios.put(`${this.url}/${id}`, data)
  }

  sort(id, order_type) {
    return axios.post(`${this.url}/reorder/${id}/${order_type == 'up' ? 1 : -1}`)
  }

  delete(id) {
    return axios.delete(`${this.url}/${id}`)
  }
}

export default ApiClient
