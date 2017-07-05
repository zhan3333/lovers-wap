import * as types from './../mutation-types'
import user from '../../api/user'

const state = {
  loginInfo: {
    uid: '',
    token: ''
  }
}

const getter = {
  loginInfo: state => state.loginInfo
}

const actions = {
  updateLoginInfo ({commit, state}, loginData) {
    console.log('actions', loginData)
    user.login(loginData)
      .then((response) => {
        commit(types.UPDATE_LOGIN_INFO, response.result)
      })
      .catch((error) => {
        console.error(error)
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
  getter,
  actions,
  mutations
}
