import ApiHelper from '@/helpers/api.helpers.js'

class UsersService extends ApiHelper {
  constructor() {
    super('/admins')
  }

  async get(params) {
    return await axios.get(this.url, {
      params: { ...params }
    })
  }
}

export default new UsersService()
