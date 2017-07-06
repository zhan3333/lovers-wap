import store from '../store'
import user from '../store/modules/user'

export const isLogin = () => {
  return user.getters.isLogin(store.state.user)
}

export default {
  isLogin
}
