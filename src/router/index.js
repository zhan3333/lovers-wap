import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/components/Chat'
import Home from '@/components/Home'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
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
    }
  ]
})
