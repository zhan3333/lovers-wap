<template>
  <div class="loginBody">
    <group gutter="8em" style="background-color: transparent">
      <x-input title="" v-model="identifier" type="text" required placeholder="邮箱/用户名"></x-input>
      <x-input title="" v-model="password" type="password" required placeholder="密码"></x-input>
      <x-button @click.native="login" type="primary">login</x-button>
      <flexbox>
        <flexbox-item :span="1/3" class="flexItem">
          <router-link to="" @click.native="toFindPassword">忘记密码？</router-link>
        </flexbox-item>
        <flexbox-item :span="1/3" class="flexItem"></flexbox-item>
        <flexbox-item :span="1/3" class="flexItem">
          <router-link :to="{name: 'register'}">现在注册</router-link>
        </flexbox-item>
      </flexbox>
    </group>
  </div>
</template>

<script>
  import { Group, Cell, XInput, XButton, Flexbox, FlexboxItem } from 'vux'
  import { mapActions } from 'vuex'

  export default {
    components: {
      Group,
      Cell,
      XInput,
      XButton,
      Flexbox,
      FlexboxItem
    },
    data () {
      return {
        identifier: '',
        password: ''
      }
    },
    methods: {
      ...mapActions([
        'updateLoginInfo'
      ]),
      login: function () {
        // 登陆逻辑
        this.updateLoginInfo({
          identifier: this.identifier,
          password: this.password
        })
          .then((result) => {
            this.$vux.toast.show({
              type: 'success',
              text: '登陆成功'
            })
            this.$router.replace({name: 'home'})
          })
          .catch((error) => {
            console.log(error.message)
            this.$vux.toast.show({
              type: 'warn',
              text: error.message
            })
          })
      },
      toFindPassword () {
        this.$vux.toast.show({
          text: '忘了我也没办法呀...',
          type: 'text'
        })
      }
    }
  }
</script>
<style lang="less">
  .loginBody {
    margin: auto 20px;
  }
  .flexItem {
    text-align: center;
    color: rgb(9, 163, 220);
  }
</style>
