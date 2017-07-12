const env = process.env.NODE_ENV
const debug = process.env.NODE_ENV !== 'production'
const config = {
  debug
}
switch (env) {
  case 'production':
    config.apiUrl = 'http://api.hd.grianchan.com/api/'
    config.chatSocketJs = '//grianchan.com:6001/socket.io/socket.io.js'
    config.chatSocketUrl = '//grianchan.com:6001'
    break
  case 'testing':
    config.apiUrl = 'http://test.com:1025/api/'
    config.chatSocketJs = '//test.com:6001/socket.io/socket.io.js'
    config.chatSocketUrl = '//test.com:6001'
    break
  default:
    config.apiUrl = 'http://test.com:1025/api/'
    config.chatSocketJs = '//test.com:6001/socket.io/socket.io.js'
    config.chatSocketUrl = '//test.com:6001'
    break
}
export default {
  config
}

