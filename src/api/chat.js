import fetch from '../js/http/fetch'

export default {
  /* 发送消息 */
  sendMessage (data) {
    console.log(111111)
    let type = data.type || 0
    let to = data.to || 0
    let message = data.message || ''
    console.log(type, to, message)
    if (!message || !to || !type) return false
    return fetch.post('chat/sendMessage', {
      type,
      to,
      message
    })
  }
}
