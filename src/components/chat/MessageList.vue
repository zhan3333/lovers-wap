<template>
  <div>
    <div v-for="message in messagesList" class="messageBox" @click="clickFriend(message.id)">
      <flexbox :gutter="0">
        <flexbox-item :span="2.5">
          <div style="text-align:center"><img :src="message.headimg"  style="height: 36px; width: 36px"></div>
        </flexbox-item>
        <flexbox-item  :span="7">
          <flexbox orient="vertical" :gutter="0">
            <flexbox-item>{{message.name}}</flexbox-item>
            <flexbox-item>{{message.lastMessage}}</flexbox-item>
          </flexbox>
        </flexbox-item>
        <flexbox-item :span="2.5">
          <flexbox orient="vertical" :gutter="0">
            <flexbox-item>{{message.time}}</flexbox-item>
            <flexbox-item>{{message.num}}</flexbox-item>
          </flexbox>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
  import { Group, Cell, Selector, Flexbox, FlexboxItem } from 'vux'

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
          time: '下午4:35',
          num: 0,
          id: 1
        },
        {
          name: '用户名',
          headimg: '/static/img/headimg/default.jpg',
          lastMessage: '最后发的消息',
          time: '下午4:35',
          num: 0,
          id: 1
        },
        {
          name: '用户名',
          headimg: '/static/img/headimg/default.jpg',
          lastMessage: '最后发的消息',
          time: '下午4:35',
          num: 0,
          id: 1
        },
        {
          name: '用户名',
          headimg: '/static/img/headimg/default.jpg',
          lastMessage: '最后发的消息',
          time: '下午4:35',
          num: 0,
          id: 1
        }
      ]
    },
    methods: {
      /**/
      clickFriend (userId) {
        this.$router.push({name: 'chat', params: {userId: userId}})
      }
    }
  }
</script>
<style>
  .messageBox {
    border-bottom: solid 1px #338b88; padding: 5px
  }
</style>
