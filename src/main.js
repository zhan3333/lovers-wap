// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'
import store from './store'
import * as Cookies from 'js-cookie'
import api from './api'
import util from './js/util'
import variables from './config/variables'
import $ from 'jquery'

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.Cookies = Cookies
Vue.prototype.$api = api
Vue.prototype.$util = util
Vue.prototype.$variables = variables
Vue.prototype.$ = $

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
