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
      headerShowBack: true,
      headerShowMore: true,
      isShowMenu: false,
      menus: {
        exit: '退出'
      }
    }
  },
  mounted () {
    this.pathChangeDo(this.$route)
    this.initRouterViewHeight()
  },
  methods: {
    ...mapActions([
      'changePageTitle', 'loginOut', 'updateAppHeight', 'updateHeaderHeight'
    ]),
    /* 初始化router-view的高度 */
    initRouterViewHeight: function () {
      let $ = this.$
      let headerHeight = $('#header').outerHeight(true)
      let appHeight = $(document).height()
      this.updateAppHeight(appHeight)
      this.updateHeaderHeight(headerHeight)
    },
    pathChangeDo: function (route) {
      console.log(route)
      if (route.name === 'login' || route.name === 'index') {
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
