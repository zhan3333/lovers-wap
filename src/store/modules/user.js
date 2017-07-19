import * as types from './../mutation-types'
import user from '../../api/user'
import * as Cookies from 'js-cookie'

const state = {
  loginInfo: {
    uid: Cookies.get('uid') || '',
    token: Cookies.get('token') || ''
  },
  selfInfo: {}
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
          commit(types.UPDATE_LOGIN_INFO, result)
          resolve(loginData)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  updateSelfInfo ({commit, state}) {
    return new Promise((resolve, reject) => {
      user.getUserInfo(state.loginInfo.uid)
        .then((result) => {
          commit(types.UPDATE_SELF_INFO, result.user)
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  /* 退出登陆 */
  loginOut ({commit}) {
    commit(types.LOGIN_OUT)
  }
}

const mutations = {
  [types.UPDATE_LOGIN_INFO] (state, {uid, token}) {
    state.loginInfo.uid = uid
    state.loginInfo.token = token
    // 设置Cookies
    Cookies.set('uid', uid, {expires: 30})
    Cookies.set('token', token, {expires: 30})
  },
  [types.LOGIN_OUT] (state) {
    state.loginInfo = {}
    // 删除Cookies
    Cookies.remove('uid')
    Cookies.remove('token')
  },
  [types.UPDATE_SELF_INFO] (state, user) {
    state.selfInfo = user
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
