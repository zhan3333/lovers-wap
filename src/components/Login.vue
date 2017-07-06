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
  import { mapActions } from 'vuex'

  export default {
    components: {
      Group,
      Cell,
      XInput,
      XButton
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
