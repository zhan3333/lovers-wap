import 'whatwg-fetch'
import variables from '../../config/variables'
import store from '../../store/index'
import user from '../../store/modules/user'
import httpRequestLog from './httpRequestLog'
import router from '../../router/index'

const serverBaseUrl = variables.config.apiUrl
const checkStatusCode = (statusCode) => {
  if (statusCode + '' === '401') {
    // 未登录
    httpRequestLog.log('no login')
    router.push({name: 'login'})
  }
}
let post = (api, data) => {
  return new Promise((resolve, reject) => {
    let requestUrl = serverBaseUrl + api
    fetch(requestUrl, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: 'Bearer ' + user.getters.getLoginInfo(store.state.user).token || '',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then((response) => {
        checkStatusCode(response.status)
        return response.json()
      })
      .then((json) => {
        httpRequestLog.group('post_request')
        httpRequestLog.log('request_url', requestUrl)
        httpRequestLog.log('request_data', data)
        if ('' + json.error_code !== '0') {
          httpRequestLog.error('request_response', json)
          httpRequestLog.groupEnd()
          reject(json)
        } else {
          httpRequestLog.log('request_response', json)
          httpRequestLog.groupEnd()
          resolve(json.result || {})
        }
      })
      .catch((error) => {
        httpRequestLog.group('post_request')
        httpRequestLog.log('request_url', requestUrl)
        httpRequestLog.log('request_data', data)
        httpRequestLog.error('request_error', error)
        httpRequestLog.groupEnd()
        reject(error)
      })
  })
}

export default {
  post
}
