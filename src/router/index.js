import Vue from 'vue'
import Router from 'vue-router'
import store from './../store'
import Chat from '@/components/Chat'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import My from '@/components/my/My'
import MessageList from '@/components/chat/MessageList'
import EditInfo from '@/components/my/EditInfo'

Vue.use(Router)

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
  console.log(to, from)
  store.dispatch('updateLoadingStatus', {isLoading: true})

  let noBackList = ['login', 'index', 'home', 'my', 'messageList']
  let showTabbarList = ['my', 'home', 'messageList']
  let noShowBack = noBackList.indexOf(to.name)
  let showTabbar = showTabbarList.indexOf(to.name)
  if (showTabbar !== -1) {
    store.dispatch('changeTabbarStatus', true)
  } else {
    store.dispatch('changeTabbarStatus', false)
  }
  if (noShowBack !== -1) {
    store.dispatch('changeHeaderShowBack', false)
  } else {
    store.dispatch('changeHeaderShowBack', true)
  }
  // 修改标题
  // this.changePageTitle(to.name)
  store.dispatch('changePageTitle', to.name)
  // 清理聊天信息
  if (to.name === 'chat') {
    // this.setChatMessageList([])
    store.dispatch('setChatMessageList', [])
  }
  next()
})

router.afterEach(function (to) {
  store.dispatch('updateLoadingStatus', {isLoading: false})
})

export default router
