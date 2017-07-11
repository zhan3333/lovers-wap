<template>
  <div class="loginBody">
    <group gutter="8em" style="background-color: transparent">
      <x-input title="" v-model="username" type="text" required placeholder="邮箱/用户名"></x-input>
      <x-input title="" v-model="password" type="password" required placeholder="密码"></x-input>
      <x-button @click.native="login" type="primary">login</x-button>
      <flexbox gutter="0">
        <flexbox-item :span="1/3" class="flexItem">忘记密码？</flexbox-item>
        <flexbox-item :span="1/3" class="flexItem"></flexbox-item>
        <flexbox-item :span="1/3" class="flexItem">新用户注册</flexbox-item>
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
        username: '390961827@qq.com',
        password: '123456'
      }
    },
    methods: {
      ...mapActions([
        'updateLoginInfo'
      ]),
      login: function () {
        // 登陆逻辑
        this.updateLoginInfo({username: this.username, password: this.password})
          .then((result) => {
            this.$router.push({name: 'home'})
          })
          .catch((error) => {
            console.log(error.message)
          })
      }
    }
  }
</script>
<style lang="less">
  .loginBody {
    margin: auto 20px;
    background-color: aqua;
  }
  .flexItem {
    text-align: center;
    color: rgb(9, 163, 220);
  }
</style>
