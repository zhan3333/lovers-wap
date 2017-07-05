import $ from 'jquery'
import variables from '../config/variables'
const serverBaseUrl = variables.config.apiUrl
export const httpRequest = {
  post (uri, data) {
    let requestUrl = serverBaseUrl + uri
    return $.post(requestUrl, data)
  },
  get (uri, data) {
    let requestUrl = serverBaseUrl + uri
    return $.get(requestUrl, data)
  }
}

