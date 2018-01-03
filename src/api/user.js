import fetch from '../js/http/fetch'
export default {
  login (loginData) {
    return fetch.post('auth/login', {
      identifier: loginData.identifier,
      password: loginData.password
    })
  },
  getFriendList () {
    return fetch.post('user/getFriendList')
  },
  isLogin () {
    return fetch.post('auth/isLogin')
  },
  register (data) {
    return fetch.post('auth/register', {
      email: data.email,
      name: data.name,
      password: data.password
    })
  },
  /* 根据id获取用户信息 */
  getUserInfo (userId) {
    return fetch.post('user/getUserInfo', {
      user_id: userId
    })
  }
}

