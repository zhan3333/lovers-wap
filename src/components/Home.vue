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
        ],
        selectFriendId: ''
      }
    },
    created () {
      this.getFriendList().then((result) => {
        this.friendList = result
      }).catch((err) => {
        console.error(err)
      })
    },
    methods: {
      /**/
      clickFriend: function (userId) {
        this.$router.push({name: 'chat', params: {userId: userId}})
      },
      getFriendList: function () {
        return this.$api.user.getFriendList()
      }
    }
  }
</script>
