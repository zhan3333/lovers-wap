<template>
  <div id="app">
    <x-header
      id="header"
      ref="header"
      :leftOptions="{showBack: headerShowBack}"
      :right-options="{showMore: headerShowMore}"
      style="width:100%;position:absolute;left:0;top:0;z-index:100;"
      @on-click-more="showMenu"
    >{{title}}</x-header>
    <router-view v-bind:style="{marginTop: routerViewMarginTop}"></router-view>
    <actionsheet v-model="isShowMenu" :menus="menus" @on-click-menu="clickMenu" show-cancel></actionsheet>
  </div>
</template>

<script>
import { XHeader, Actionsheet } from 'vux'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'app',
  components: {
    XHeader,
    Actionsheet
  },
  data () {
    return {
      headerHeight: 0,
      headerShowBack: true,
      headerShowMore: true,
      isShowMenu: false,
      menus: {
        exit: '退出'
      }
    }
  },
  mounted () {
    console.log(this)
    this.pathChangeDo(this.$route)
    this.initRouterViewHeight()
  },
  methods: {
    ...mapActions([
      'changePageTitle', 'loginOut'
    ]),
    /* 初始化router-view的高度 */
    initRouterViewHeight: function () {
      let $ = this.$
      let headerHeight = $('#header').outerHeight(true)
      this.headerHeight = headerHeight || 46
    },
    pathChangeDo: function (route) {
      if (route.name === 'login') {
        this.showBack = false
      } else {
        this.showBack = true
      }
      this.changePageTitle(route.name)
    },
    /* 右上角菜单点击 */
    showMenu: function () {
      this.isShowMenu = true
    },
    /* 选择菜单 */
    clickMenu: function (key) {
      console.log(key)
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
    }
  },
  computed: {
    ...mapState({
      title: state => state.title
    }),
    path: function () {
      return this.$route.path
    },
    route: function () {
      return this.$route
    },
    routerViewMarginTop: function () {
      return this.headerHeight + 'px'
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
