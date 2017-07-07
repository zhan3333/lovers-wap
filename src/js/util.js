import api from '../api'

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

export default {
  isLogin,
  isLoginWithGoLogin
}
