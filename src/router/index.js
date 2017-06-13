import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/components/Chat'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'chat',
      path: '/chat',
      component: Chat
    }
  ]
})
