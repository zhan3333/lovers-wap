import * as types from './../mutation-types'
import user from '../../api/user'
import { cookie } from 'vux'

const state = {
  loginInfo: {
    uid: cookie.get('uid') || '',
    token: cookie.get('token') || ''
  },
  selfInfo: {}
}

const getters = {
  getLoginInfo: state => state.loginInfo,
  hasToken: state => !!state.loginInfo.uid,
  isLogin: state => !!state.loginInfo.uid
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
  /* 更新登陆用户的信息 */
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
  /* 修改用户的头像 */
  updateSelfHeadimg ({commit, state}, headimgFullUrl) {
    commit(types.UPDATE_SELF_HEADIMG, headimgFullUrl)
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
    cookie.set('uid', uid, {expires: 30})
    cookie.set('token', token, {expires: 30})
  },
  [types.LOGIN_OUT] (state) {
    state.loginInfo.uid = ''
    state.loginInfo.token = ''
    // 删除Cookies
    cookie.remove('uid')
    cookie.remove('token')
  },
  [types.UPDATE_SELF_INFO] (state, user) {
    state.selfInfo = {...user}
  },
  [types.UPDATE_SELF_HEADIMG] (state, headimgFullUrl) {
    state.selfInfo.headimg_url = headimgFullUrl
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
