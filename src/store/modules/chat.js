import * as types from './../mutation-types'
import * as Cookies from 'js-cookie'

const state = {
  chatToUserId: Cookies.get('chatToUserId') || ''
}

const getters = {
}

const actions = {
  updateChatToUserId ({commit, state}, chatToUserId) {
    commit(types.UPDATE_CHAT_TO_USER_ID, chatToUserId)
  }
}

const mutations = {
  [types.UPDATE_CHAT_TO_USER_ID] (state, chatToUserId) {
    state.chatToUserId = chatToUserId + ''
    // 设置Cookies
    Cookies.set('chatToUserId', state.chatToUserId, {expires: 30})
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
