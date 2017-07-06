import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import user from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV === 'production'
const state = {}
export default new Vuex.Store({
  state,
  actions,
  getters,
  modules: {
    user
  },
  strict: debug
})
