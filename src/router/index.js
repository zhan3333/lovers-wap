import Vue from 'vue'
import Router from 'vue-router'
import store from './../store'
import { mapActions } from 'vuex'
import Chat from '@/components/Chat'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import My from '@/components/my/My'
import MessageList from '@/components/chat/MessageList'
import EditInfo from '@/components/my/EditInfo'

Vue.use(Router)
const loading = mapActions(['updateLoadingStatus'])
console.log(loading)
console.log(store)

const router = new Router({
  routes: [
    {
      name: 'index',
      path: '/',
      component: Home
    },
    {
      name: 'home',
      path: '/home',
      component: Home
    },
    {
      name: 'chat',
      path: '/chat',
      component: Chat
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'register',
      path: '/register',
      component: Register
    },
    {
      name: 'my',
      path: '/my',
      component: My
    },
    {
      name: 'editInfo',
      path: '/editInfo',
      component: EditInfo
    },
    {
      name: 'messageList',
      path: '/messageList',
      component: MessageList
    }
  ]
})

router.beforeEach(function (to, from, next) {
  console.log('beforeEach')
  store.dispatch('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.dispatch('updateLoadingStatus', {isLoading: false})
})

export default router
