<template>
  <div id="app" style="height:100%;">
    <x-header id="header" slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">标题</x-header>
    <router-view v-bind:style="{marginTop: routerViewMarginTop}"></router-view>
  </div>
</template>

<script>
import { XHeader } from 'vux'
export default {
  name: 'app',
  components: {
    XHeader
  },
  data () {
    return {
      headerHeight: 0
    }
  },
  mounted () {
    this.initRouterViewHeight()
  },
  methods: {
    /* 初始化router-view的高度 */
    initRouterViewHeight: function () {
      let $ = this.$
      let headerHeight = $('#header').outerHeight(true)
      this.headerHeight = headerHeight || 46
    }
  },
  computed: {
    routerViewMarginTop: function () {
      return this.headerHeight + 'px'
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
