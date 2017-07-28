import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import user from './modules/user'
import chat from './modules/chat'
import loading from './modules/loading'

Vue.use(Vuex)

const debug = process.env.NODE_ENV === 'production'
const state = {
  title: 'lovers',
  appHeight: 0,
  headerHeight: 0,
  /* 是否显示底部导航 */
  showTabbar: '',
  /* 导航栏是否显示返回按钮 */
  headerShowBack: false
}
export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    user,
    chat,
    loading
  },
  strict: debug
})
