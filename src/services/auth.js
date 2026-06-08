import ApiHelper from '@/helpers/api.helpers.js'

class AuthService extends ApiHelper {
  constructor() {
    super('/dashboard')
  }

  async login(body) {
    return await axios.post(`${this.url}/auth/admin-login`, body)
  }
}

export default new AuthService()
