import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import user from './modules/user'

console.log(actions)
Vue.use(Vuex)

const debug = process.env.NODE_ENV === 'production'
const state = {
  title: 'lovers'
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
