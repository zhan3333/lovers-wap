<template>
  <div>
    <group>
      <x-input title="username" v-model="username"></x-input>
      <x-input title="password" v-model="password" type="password"></x-input>
      <x-button @click.native="login">login</x-button>
    </group>
  </div>
</template>

<script>
  import { Group, Cell, XInput, XButton } from 'vux'

  export default {
    components: {
      Group,
      Cell,
      XInput,
      XButton
    },
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login: function () {
        // 登陆逻辑
        console.log(this.username, this.password)
      }
    }
  }
</script>
