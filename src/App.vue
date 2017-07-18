<template>
  <div id="app" ref="app" style="{height: 100%}">
    <x-header
      id="header"
      ref="header"
      :leftOptions="{showBack: headerShowBack}"
      :right-options="{showMore: headerShowMore}"
      style="width:100%;position:absolute;left:0;top:0;z-index:100;"
      @on-click-more="showMenu"
    >{{title}}
    </x-header>
    <router-view v-bind:style="{paddingTop: routerViewPaddingTop, height: routerViewHeight}"></router-view>
    <tabbar v-bind:style="{display: showTabbar}">
      <tabbar-item @on-item-click="clickTabbar">
        <span slot="label" >聊天</span>
      </tabbar-item>
      <tabbar-item @on-item-click="clickTabbar">
        <span slot="label">好友</span>
      </tabbar-item>
      <tabbar-item @on-item-click="clickTabbar">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
    <actionsheet v-model="isShowMenu" :menus="menus" @on-click-menu="clickMenu" show-cancel></actionsheet>
  </div>
</template>

<script>
import { XHeader, Actionsheet, Tabbar, TabbarItem } from 'vux'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'app',
  components: {
    XHeader,
    Actionsheet,
    Tabbar,
    TabbarItem
  },
  data () {
    return {
      headerShowBack: true,
      headerShowMore: true,
      isShowMenu: false,
      menus: {
        exit: '退出'
      },
      showTabbar: ''
    }
  },
  created () {
  },
  mounted () {
    this.pathChangeDo(this.$route)
    this.initRouterViewHeight()
    this.loadSocketJs()
    setTimeout(this.initSocketListen, 500)
  },
  methods: {
    ...mapActions([
      'changePageTitle', 'loginOut', 'updateAppHeight', 'updateHeaderHeight', 'addChatMessage', 'addMessagesList', 'setChatMessageList'
    ]),
    /* 初始化router-view的高度 */
    initRouterViewHeight: function () {
      let $ = this.$
      let headerHeight = $('#header').outerHeight(true)
      let appHeight = $(document).height()
      this.updateAppHeight(appHeight)
      this.updateHeaderHeight(headerHeight)
    },
    /* path 变更时操作 */
    pathChangeDo: function (route) {
      console.log(route)
      let noBackList = ['login', 'index', 'home', 'my', 'messageList']
      let showTabbarList = ['my', 'home', 'messageList']
      let noShowBack = noBackList.indexOf(route.name)
      let showTabbar = showTabbarList.indexOf(route.name)
      if (showTabbar !== -1) {
        this.showTabbar = ''
      } else {
        this.showTabbar = 'none'
      }
      if (noShowBack !== -1) {
        this.headerShowBack = false
      } else {
        this.headerShowBack = true
      }
      // 修改标题
      this.changePageTitle(route.name)
      // 清理聊天信息
      if (route.name === 'chat') {
        this.setChatMessageList([])
      }
    },
    /* 右上角菜单点击 */
    showMenu: function () {
      this.isShowMenu = true
    },
    /* 选择菜单 */
    clickMenu: function (key) {
      switch (key) {
        case 'exit': {
          this.loginOut()
          this.$vux.toast.show({
            text: '退出成功',
            type: 'success'
          })
          this.$router.replace('login')
        }
      }
    },
    /* 加载socket需要的js文件 */
    loadSocketJs () {
      let js = this.$variables.config.chatSocketJs
      let html = '<script src=" ' + js + '"' + '>' + '<' + '/script>'
      this.$('#socket-js').html(html)
    },
    /* 点击tabbar触发 */
    clickTabbar (index) {
      console.log(index)
      if (index === 0) {
        this.$router.replace('messageList')
      } else if (index === 1) {
        this.$router.replace('home')
      } else if (index === 2) {
        this.$router.replace('my')
      }
    },
    /* 监听所在频道 */
    initSocketListen () {
      let channel = 'chat.' + this.$store.state.user.loginInfo.uid
      console.log('listen to ' + channel)
      let echo = this.$util.initEcho()
      echo.private(channel)
        .listen('SendMessage', (e) => {
          console.log(e)
          let message = e.message
          let user = e.user
          message.name = user.name
          this.$vux.toast.show({
            text: message.name + ': ' + message.content,
            type: 'text'
          })
          // 设置聊天消息
          this.addChatMessage(message)
          // 设置消息
          this.addMessagesList({
            name: user.name,
            headimg: '/static/img/headimg/default.jpg',
            lastMessage: message.content,
            time: new Date(),
            num: 0,
            toId: user.id,
            type: 1,
            id: this.$store.state.user.loginInfo.uid
          })
        })
        .notification((data) => {
          console.log(data)
        })
    }
  },
  computed: {
    ...mapState({
      title: state => state.title,
      headerHeight: state => state.headerHeight,
      appHeight: state => state.appHeight
    }),
    path: function () {
      return this.$route.path
    },
    route: function () {
      return this.$route
    },
    routerViewPaddingTop: function () {
      return this.headerHeight + 'px'
    },
    routerViewHeight: function () {
      return this.appHeight - this.headerHeight + 'px'
    }
  },
  watch: {
    route (route) {
      this.pathChangeDo(route)
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
</style>
