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
    <!-- 底部tabbar栏 -->
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
    <!-- 右上角菜单 -->
    <actionsheet v-model="isShowMenu" :menus="menus" @on-click-menu="clickMenu" show-cancel></actionsheet>
    <!-- 页面切换加载图 -->
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
import { XHeader, Actionsheet, Tabbar, TabbarItem, Loading } from 'vux'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {
    XHeader,
    Actionsheet,
    Tabbar,
    TabbarItem,
    Loading
  },
  data () {
    return {
      headerShowMore: true,
      isShowMenu: false,
      menus: {
        exit: '退出'
      }
    }
  },
  created () {
    this.initMessagesList()
  },
  mounted () {
    this.initRouterViewHeight()
    this.loadSocketJs()
    if (this.isLogin && this._.isEmpty(this.$store.state.user.selfInfo)) {
      this.updateSelfInfo()
    }
  },
  methods: {
    ...mapActions([
      'loginOut',
      'updateAppHeight',
      'updateHeaderHeight',
      'addChatMessage',
      'addMessagesList',
      'setChatMessageList',
      'updateSelfInfo',
      'initMessagesList'
    ]),
    /* 初始化router-view的高度 */
    initRouterViewHeight: function () {
      let $ = this.$
      let headerHeight = $('#header').outerHeight(true)
      let appHeight = $(document).height()
      this.updateAppHeight(appHeight)
      this.updateHeaderHeight(headerHeight)
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
      this.$.getScript(js)
        .then(() => {
          if (this.isLogin) this.initSocketListen()
        })
    },
    /* 点击tabbar触发 */
    clickTabbar (index) {
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
      if (!this.$store.state.user.loginInfo.uid) return false
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
            headimg: user.headimg_url,
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
      appHeight: state => state.appHeight,
      uid: state => state.user.loginInfo.uid,
      headerShowBack: state => state.headerShowBack,
      showTabbar: state => state.showTabbar
    }),
    ...mapGetters([
      'isLogin', 'isLoading'
    ]),
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
    uid (val, oldVal) {
      if (val) {
        this.updateSelfInfo()
        this.initSocketListen()
      }
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
