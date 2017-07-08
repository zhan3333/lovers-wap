const env = process.env.NODE_ENV
const debug = process.env.NODE_ENV !== 'production'
const config = {
  debug
}
switch (env) {
  case 'production':
    config.apiUrl = 'http://test.com:1025/api/'
    config.chatSocketUrl = '//test.com:6001/socket.io/socket.io.js'
    break
  case 'testing':
    config.apiUrl = 'http://test.com:1025/api/'
    config.chatSocketUrl = '//test.com:6001/socket.io/socket.io.js'
    break
  default:
    config.apiUrl = 'http://test.com:1025/api/'
    config.chatSocketUrl = '//test.com:6001/socket.io/socket.io.js'
    break
}
export default {
  config
}

