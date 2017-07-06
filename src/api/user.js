import fetch from '../js/http/fetch'
export default {
  login (loginData) {
    return fetch.post('auth/login', {
      email: loginData.username,
      password: loginData.password
    })
  }
}

