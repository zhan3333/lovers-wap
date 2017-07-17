<template>
  <div>
    <div v-for="message in messagesList">
      <flexbox>
        <flexbox-item>img</flexbox-item>
        <flexbox-item>
          <flexbox orient="vertical">
            <flexbox-item>name</flexbox-item>
            <flexbox-item>lastMessage</flexbox-item>
          </flexbox>
        </flexbox-item>
        <flexbox-item>
          <flexbox orient="vertical">
            <flexbox-item>time</flexbox-item>
            <flexbox-item>messageNum</flexbox-item>
          </flexbox>
        </flexbox-item>
      </flexbox>
    </div>

  </div>
</template>

<script>
  import { Group, Cell, Selector } from 'vux'
  import Flexbox from '../../../node_modules/vux/src/components/flexbox/flexbox'
  import FlexboxItem from '../../../node_modules/vux/src/components/flexbox/flexbox-item'

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
        messagesList: [
        ]
      }
    },
    created () {
      this.messagesList = [
        {
          name: '用户名',
          headimg: '/static/img/headimg/default.jpg',
          lastMessage: '最后发的消息',
          time: '下午4:35'
        },
        {
          name: '用户名',
          headimg: '/static/img/headimg/default.jpg',
          lastMessage: '最后发的消息',
          time: '下午4:35'
        },
        {
          name: '用户名',
          headimg: '/static/img/headimg/default.jpg',
          lastMessage: '最后发的消息',
          time: '下午4:35'
        },
        {
          name: '用户名',
          headimg: '/static/img/headimg/default.jpg',
          lastMessage: '最后发的消息',
          time: '下午4:35'
        }
      ]
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
