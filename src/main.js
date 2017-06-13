// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'
import { AjaxPlugin } from 'vux'
import _ from 'lodash'
Vue.use(AjaxPlugin)
var httpRequest = Vue.http.create({
  baseURL: 'http://test.com:1025/api/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly90ZXN0LmNvbToxMDI1L2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNDk3MzY4NjY3LCJleHAiOjE0OTczNzIyNjcsIm5iZiI6MTQ5NzM2ODY2NywianRpIjoiN01sSUR3cGpRTWlYTENXMCJ9.sp-7RJDyn7VoUmqwr-B4bpBEGoQFOpGn2E8m_nlRT3A'
  },
  timeout: 1000,
  method: 'post'
})

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype._ = _
Vue.prototype.httpRequest = httpRequest

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
