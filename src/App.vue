<template>
  <div id="app" style="height:100%;">
    <x-header id="header" slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">标题</x-header>
    <router-view style=""></router-view>
  </div>
</template>

<script>
import { XHeader } from 'vux'
export default {
  name: 'app',
  components: {
    XHeader
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
