<template>
  <div>
    <group v-for="user in friendList">
      <cell is-link @click.native="clickFriend(user.id)">{{user.name}}</cell>
    </group>
  </div>
</template>

<script>
  import { Group, Cell, Selector } from 'vux'

  export default {
    components: {
      Group,
      Cell,
      Selector
    },
    data () {
      return {
        friendList: [
          {
            id: 1,
            name: 'zhan'
          },
          {
            id: 2,
            name: 'zhan01'
          }
        ],
        selectFriendId: ''
      }
    },
    methods: {
      /**/
      clickFriend: function (userId) {
        console.log('userId:', userId)
      }
    }
  }
</script>

<style>
  .vux-demo {
    text-align: center;
  }
  .logo {
    width: 100px;
    height: 100px
  }
</style>
