<template>
  <div>
    <group v-for="user in friendList">
      <cell is-link @click.native="clickFriend(user.id)">
        <flexbox :gutter="0">
          <!--好友头像-->
          <flexbox-item :span="4">
            <div style="text-align:center"><img :src="user.headimg_url" class="headimg"></div>
          </flexbox-item>
          <flexbox-item :span="8">
            <!--右侧好友名称和签名-->
            <flexbox :gutter="0"   orient="vertical">
              <flexbox-item>{{user.name}}</flexbox-item>
              <flexbox-item></flexbox-item>
            </flexbox>
          </flexbox-item>
        </flexbox>
      </cell>
    </group>
  </div>
</template>

<script>
  import { Group, Cell, Selector } from 'vux'
  import Flexbox from '../../node_modules/vux/src/components/flexbox/flexbox'
  import FlexboxItem from '../../node_modules/vux/src/components/flexbox/flexbox-item'

  export default {
    components: {
      FlexboxItem,
      Flexbox,
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
<style>
  .headimg {
    height: 55px;
    width: 55px;
    border-radius: 50%;
  }
</style>
