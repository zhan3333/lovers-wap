// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import store from './store'
import api from './api'
import util from './js/util'
import variables from './config/variables'
import $ from 'jquery'
import { ToastPlugin, LoadingPlugin, cookie, dateFormat } from 'vux'
import * as _ from 'lodash'

Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.cookie = cookie
Vue.prototype.$api = api
Vue.prototype.$util = util
Vue.prototype.$variables = variables
Vue.prototype.$ = $
Vue.prototype._ = _
Vue.prototype.dateFormat = dateFormat

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
