const env = process.env.NODE_ENV
const config = {}
switch (env) {
  case 'production':
    config.apiUrl = 'http://test.com:1025/api/'
    break
  case 'testing':
    config.apiUrl = 'http://test.com:1025/api/'
    break
  default:
    config.apiUrl = 'http://test.com:1025/api/'
    break
}
export default {
  config
}

