import * as types from './../mutation-types'
import * as Cookies from 'js-cookie'
import * as _ from 'lodash'

const state = {
  chatToUserId: Cookies.get('chatToUserId') || '',
  messagesList: [],
  /* 接收消息列表 */
  chatMessageList: []
}

const getters = {
}

const actions = {
  updateChatToUserId ({commit}, chatToUserId) {
    commit(types.UPDATE_CHAT_TO_USER_ID, chatToUserId)
  },
  addMessagesList ({commit}, messageObj) {
    commit(types.ADD_MESSAGES_LIST, messageObj)
  },
  addChatMessage ({commit}, messageObj) {
    commit(types.ADD_CHAT_MESSAGE, messageObj)
  },
  setChatMessageList ({commit}, messageList) {
    commit(types.SET_CHAT_MESSAGE_LIST, messageList)
  }
}

const mutations = {
  [types.UPDATE_CHAT_TO_USER_ID] (state, chatToUserId) {
    state.chatToUserId = chatToUserId + ''
    // 设置Cookies
    Cookies.set('chatToUserId', state.chatToUserId, {expires: 30})
  },
  [types.ADD_MESSAGES_LIST] (state, messageObj) {
    messageObj.key = Math.min(messageObj.id, messageObj.toId) + '-' + Math.max(messageObj.id, messageObj.toId) + '-' + messageObj.type
    state.messagesList = _.unionBy([messageObj], state.messagesList, 'key')
  },
  [types.ADD_CHAT_MESSAGE] (state, messageObj) {
    state.chatMessageList.push(messageObj)
  },
  [types.SET_CHAT_MESSAGE_LIST] (state, messageList) {
    state.chatMessageList = messageList
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
