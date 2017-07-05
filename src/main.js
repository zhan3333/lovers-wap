// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'
import { AjaxPlugin } from 'vux'
import _ from 'lodash'
import store from './store'
import util from './js/util'

Vue.use(AjaxPlugin)

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

/* eslint-disable no-new */
new Vue({
  router,
  store,
  util,
  render: h => h(App)
}).$mount('#app-box')
