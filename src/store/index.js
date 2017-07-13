import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import user from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV === 'production'
const state = {
  title: 'lovers',
  appHeight: 0,
  headerHeight: 0
}
export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    user
  },
  strict: debug
})
