import {httpRequest} from '../js/util'
export default {
  login (loginData) {
    return httpRequest.post('auth/login', {
      email: loginData.username,
      password: loginData.password
    })
  }
}

