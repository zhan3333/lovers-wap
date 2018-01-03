import * as types from './../mutation-types'
import * as _ from 'lodash'
import { cookie } from 'vux'
import localforage from 'localforage'
const state = {
  chatToUserId: cookie.get('chatToUserId', {}) || '',
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
  /* 添加一条聊天记录到消息列表中 */
  addMessagesList ({commit}, messageObj) {
    commit(types.ADD_MESSAGES_LIST, messageObj)
  },
  /* 添加一条聊天消息到列表中 */
  addChatMessage ({commit}, messageObj) {
    commit(types.ADD_CHAT_MESSAGE, messageObj)
  },
  /* 获取本地储存的消息列表 */
  initMessagesList ({commit}) {
    localforage.getItem('messagesList')
      .then((result) => {
        commit(types.INIT_MESSAGES_LIST, result)
      })
      .catch((error) => {
        console.error(error)
      })
  },
  /* 设置聊天消息列表 */
  setChatMessageList ({commit}, messageList) {
    commit(types.SET_CHAT_MESSAGE_LIST, messageList)
  }
}

const mutations = {
  [types.UPDATE_CHAT_TO_USER_ID] (state, chatToUserId) {
    state.chatToUserId = chatToUserId + ''
    // 设置Cookies
    cookie.set('chatToUserId', state.chatToUserId, {expires: 30})
  },
  [types.ADD_MESSAGES_LIST] (state, messageObj) {
    messageObj.key = Math.min(messageObj.id, messageObj.toId) + '-' + Math.max(messageObj.id, messageObj.toId) + '-' + messageObj.type
    state.messagesList = _.unionBy([messageObj], state.messagesList, 'key')
    localforage.setItem('messagesList', state.messagesList)
  },
  /* 添加聊天消息 */
  [types.ADD_CHAT_MESSAGE] (state, messageObj) {
    state.chatMessageList.push(messageObj)
  },
  /* 设置历史聊天消息 */
  [types.SET_CHAT_MESSAGE_LIST] (state, messageList) {
    state.chatMessageList = messageList
  },
  [types.INIT_MESSAGES_LIST] (state, messageList) {
    state.messagesList = messageList
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
