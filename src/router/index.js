import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/components/Chat'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import My from '@/components/my/My'
import MessageList from '@/components/chat/MessageList'
import EditInfo from '@/components/my/EditInfo'

Vue.use(Router)

export default new Router({
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
      component: My,
      children: [
        {
          path: 'editInfo',
          component: EditInfo,
          name: 'editInfo'
        }
      ]
    },
    {
      name: 'messageList',
      path: '/messageList',
      component: MessageList
    }
  ]
})
