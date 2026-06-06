import ApiHelper from '@/helpers/api.helpers.js'

class UsersService extends ApiHelper {
  constructor() {
    super('/vehicles')
  }

  async get(params) {
    return await axios.get(this.url, {
      params: { ...params }
    })
  }
}

export default new UsersService()
