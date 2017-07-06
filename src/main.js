// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'
import _ from 'lodash'
import store from './store'
import * as Cookies from 'js-cookie'

// var httpRequest = Vue.http.create({
//   baseURL: 'http://test.com:1025/api/',
//   headers: {
//     'X-Requested-With': 'XMLHttpRequest',
//     Authorization: 'Bearer '
//   },
//   timeout: 1000,
//   method: 'post'
// })

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype._ = _
Vue.prototype.Cookies = Cookies

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
