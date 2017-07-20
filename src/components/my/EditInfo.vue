<template>
  <div>
    <group>
      <cell title="头像" @click.native="clickChangeHeadimg" :border-intent="false">
        <img :src="headimg" solt="value" style="height: 40px; width: 40px;border-radius: 50%; margin: 10px auto 5px auto;vertical-align: middle;">
      </cell>
      <cell title="用户名/昵称" :border-intent="false"></cell>
    </group>
  </div>
</template>
<script>
  import Group from '../../../node_modules/vux/src/components/group/index'
  import Cell from '../../../node_modules/vux/src/components/cell/index'
  export default {
    components: {
      Cell,
      Group
    },
    data () {
      return {
        headimg: '/static/img/headimg/default.jpg'
      }
    },
    mounted () {
      console.log(111)
    },
    methods: {
      clickChangeHeadimg () {
        console.log('click')
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/weui/widget/weui-uploader/index.less';
</style>
