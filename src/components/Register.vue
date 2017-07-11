<template>
  <div class="registerBody">
    <group gutter="8em" style="background-color: transparent">
      <x-input title="" v-model="username" type="text" required placeholder="邮箱/用户名"></x-input>
      <x-input title="" v-model="password" type="password" required placeholder="密码"></x-input>
      <x-input title="" v-model="password_repeat" type="password" required placeholder="重复密码"></x-input>
      <x-button @click.native="login" type="primary">login</x-button>
    </group>
  </div>
</template>
<script>
  import { Group, XInput, XButton } from 'vux'

  export default {
    data () {
      return {
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
    }
  }
</script>
<style lang="less">
  .registerBody {
    margin: auto 20px;
    background-color: aqua;
  }
</style>

