import fetch from '../js/http/fetch'

export default {
  /* 发送消息 */
  sendMessage (data) {
    let type = data.type || 0
    let to = data.to || 0
    let content = data.content || ''
    return fetch.post('chat/sendMessage', {
      type,
      to,
      content
    })
  },
  /* 获取历史消息 */
  getHistoryMessageList (data) {
    let page = data.page
    let length = data.length
    let userId = data.userId
    let curMessageId = data.curMessageId
    return fetch.post('chat/getHistoryMessageList', {
      page,
      length,
      userId,
      curMessageId
    })
  }
}
