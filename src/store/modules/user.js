import * as types from './../mutation-types'
import user from '../../api/user'

const state = {
  loginInfo: {
    uid: '',
    token: ''
  }
}

const getters = {
  getLoginInfo: state => state.loginInfo
}

const actions = {
  updateLoginInfo ({commit, state}, loginData) {
    return new Promise((resolve, reject) => {
      user.login(loginData)
        .then((result) => {
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
