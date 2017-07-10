import api from '../api'
import Echo from 'laravel-echo'
import store from '../store'
import variables from '../config/variables'

export const isLogin = () => {
  return api.user.isLogin()
}

// 检查登陆状态，未登陆则跳转到登陆页
export const isLoginWithGoLogin = (router) => {
  this.isLogin()
    .then((result) => {
      if (result.isLogin) return true
      else {
        router.push({name: 'login'})
        return false
      }
    })
}

/* 初始化echo 对象 */
export const initEcho = () => {
  if (!store.state.user.loginInfo.token) return false
  let echo = new Echo({
    broadcaster: 'socket.io',
    host: variables.config.chatSocketUrl,
    auth: {
      headers: {
        Authorization: 'Bearer ' + store.state.user.loginInfo.token
      }
    }
  })
  return echo
}

export default {
  isLogin,
  isLoginWithGoLogin,
  initEcho
}
