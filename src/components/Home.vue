<template>
  <div>
    <div v-for="user in friendList">
      <flexbox :gutter="0" @click.native="clickFriend(user.id)" class="friend-box">
        <!--好友头像-->
        <flexbox-item :span="2">
          <div class="headimg-box"><img :src="user.headimg_url"></div>
        </flexbox-item>
        <flexbox-item :span="10">
          <!--右侧好友名称和签名-->
          <flexbox :gutter="0"   orient="vertical">
            <flexbox-item class="name">{{user.name}}</flexbox-item>
            <flexbox-item class="signature">签名</flexbox-item>
          </flexbox>
        </flexbox-item>
      </flexbox>
    </div>
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
  .headimg-box img{
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin: 10px auto;
    vertical-align: middle;
  }
  .headimg-box {
    text-align: center;
  }
  .friend-box {
    border-bottom: solid 1px #dedfe0;
  }
  .name {
    font-weight: normal;
  }
  .signature {
    color: #808080;
  }
</style>
