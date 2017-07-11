<template>
  <div class="registerBody">
    <group gutter="8em" style="background-color: transparent">
      <x-input title="" v-model="username" type="text" required placeholder="用户名"></x-input>
      <x-input title="" v-model="email" type="email" required placeholder="邮箱"></x-input>
      <x-input title="" v-model="password" type="password" required placeholder="密码"></x-input>
      <x-input title="" v-model="password_repeat" type="password" required placeholder="重复密码"></x-input>
      <x-button @click.native="register" type="primary">register</x-button>
    </group>
  </div>
</template>
<script>
  import { Group, XInput, XButton } from 'vux'

  export default {
    data () {
      return {
        email: '',
        username: '',
        password: '',
        password_repeat: ''
      }
    },
    components: {
      Group,
      XInput,
      XButton
    },
    mounted () {
    },
    methods: {
      /* 注册 */
      register: function () {
        this.$vux.loading.show({
          text: '注册中'
        })
        this.$api.user.register({
          email: this.email,
          password: this.password,
          name: this.username
        }).then((result) => {
          console.log(result)
          this.$vux.toast.show({
            type: 'success',
            text: '注册成功'
          })
          this.$vux.loading.hide()
          this.$router.replace('login ')
        }).catch((error) => {
          console.log(error)
          this.$vux.toast.show({
            type: 'warn',
            text: error.message
          })
          this.$vux.loading.hide()
        })
      }
    }
  }
</script>
<style lang="less">
  .registerBody {
    margin: auto 20px;
    background-color: aqua;
  }
</style>

