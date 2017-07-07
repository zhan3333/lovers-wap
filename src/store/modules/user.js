import * as types from './../mutation-types'
import user from '../../api/user'
import * as Cookies from 'js-cookie'

const state = {
  loginInfo: {
    uid: Cookies.get('uid') || '',
    token: Cookies.get('token') || ''
  }
}

const getters = {
  getLoginInfo: state => state.loginInfo,
  hasToken: state => !!state.loginInfo.uid
}

const actions = {
  updateLoginInfo ({commit, state}, loginData) {
    return new Promise((resolve, reject) => {
      user.login(loginData)
        .then((result) => {
          // 设置Cookies
          Cookies.set('uid', result.uid)
          Cookies.set('token', result.token)
          commit(types.UPDATE_LOGIN_INFO, result)
          resolve(loginData)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

const mutations = {
  [types.UPDATE_LOGIN_INFO] (state, {uid, token}) {
    state.loginInfo.uid = uid
    state.loginInfo.token = token
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
