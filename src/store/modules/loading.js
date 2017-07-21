import * as types from './../mutation-types'

const state = {
  isLoading: false
}

const actions = {
  updateLoadingStatus ({commit, state}, {isLoading}) {
    commit(types.UPDATE_LOADING_STATUS, isLoading)
  }
}

const mutations = {
  [types.UPDATE_LOADING_STATUS] (state, isLoading) {
    state.isLoading = isLoading
    console.log(isLoading, state)
  }
}

const getters = {
  isLoading: state => state.isLoading
}

export default {
  state,
  actions,
  mutations,
  getters
}
