<template>
  <div>
    <group>
      <cell title="头像" @click.native="clickChangeHeadimg">
        <form id="uploadHeadimgForm" enctype="multipart/form-data" style="display: none;">
          <input v-on:change="fileOnChange" type="file" name="headimg" id="headimg"/>
        </form>
        <img :src="headimg_full_path" solt="value" style="height: 40px; width: 40px;border-radius: 50%; margin: 10px auto 5px auto;vertical-align: middle;">
      </cell>
      <cell title="用户名/昵称" :border-intent="false"></cell>
    </group>
  </div>
</template>
<script>
  import Group from '../../../node_modules/vux/src/components/group/index'
  import Cell from '../../../node_modules/vux/src/components/cell/index'
  import { mapState } from 'vuex'
  export default {
    components: {
      Cell,
      Group
    },
    data () {
      return {
        file: ''
      }
    },
    mounted () {
    },
    methods: {
      clickChangeHeadimg () {
        this.$('#headimg').click()
      },
      fileOnChange () {
        this.$vux.loading.show({
          text: '上传中...'
        })
        this.$.ajax({
          url: this.$variables.config.apiUrl + 'user/setHeadimg',
          type: 'POST',
          cache: false,
          data: new FormData(this.$('#uploadHeadimgForm')[0]),
          processData: false,
          contentType: false,
          headers: {Authorization: 'Bearer ' + this.$store.state.user.loginInfo.token || ''}
        }).then((res) => {
          console.log(res)
          if (res.error_code === '0') {
            this.$vux.loading.hide()
            this.$vux.toast.show({
              type: 'success',
              text: '上传成功'
            })
            this.headimg = res.result.path
          } else {
            throw res.message
          }
        }).catch((res) => {
          console.error(res)
          this.$vux.loading.hide()
          this.$vux.toast.show({
            type: 'warn',
            text: '上传失败'
          })
        })
      }
    },
    computed: {
      ...mapState({
        headimg_full_path: (state) => state.user.selfInfo.headimg_full_path || '/static/img/headimg/default.jpg'
      })
    }
  }
</script>

<style lang="less">
</style>
