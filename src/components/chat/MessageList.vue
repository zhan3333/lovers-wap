<template>
  <div>
    <div v-for="message in messagesList" class="messageBox" @click="clickFriend(message.toId)">
      <flexbox :gutter="0" class="message">
        <flexbox-item :span="2.5">
          <div style="text-align:center"><img :src="message.headimg" class="message-headimg"></div>
        </flexbox-item>
        <flexbox-item  :span="7">
          <flexbox orient="vertical" :gutter="0">
            <flexbox-item class="message-name">{{message.name}}</flexbox-item>
            <flexbox-item class="message-content">{{message.lastMessage}}</flexbox-item>
          </flexbox>
        </flexbox-item>
        <flexbox-item :span="2.5">
          <flexbox orient="vertical" :gutter="0">
            <flexbox-item class="message-time">{{message.time | messageTimeFormat}}</flexbox-item>
            <flexbox-item>{{message.num | messageNumFormat}}</flexbox-item>
          </flexbox>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
  import { Group, Cell, Selector, Flexbox, FlexboxItem } from 'vux'
  import { mapState } from 'vuex'

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
      }
    },
    created () {
    },
    methods: {
      /**/
      clickFriend (userId) {
        this.$router.push({name: 'chat', params: {userId: userId}})
      }
    },
    computed: {
      ...mapState({
        messagesList: (state) => state.chat.messagesList
      })
    },
    filters: {
      /* 格式化消息时间 */
      messageTimeFormat (date) {
        if (!date) date = new Date()
        let today = new Date()
        today.setHours(0, 0, 0, 0)
        let yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        yesterday.setHours(0, 0, 0, 0)

        let ret = '未知'
        if (date >= today) {
          let minutes = date.getMinutes()
          if (minutes < 10) minutes = '0' + minutes
          ret = date.getHours() + ':' + minutes
        } else if (date >= yesterday && date < today) {
          ret = '昨天'
        } else {
          ret = date.getMonth() + '-' + date.getDate()
        }
        return ret
      },
      /* 格式化消息条数 */
      messageNumFormat (num) {
        if (num === 0) return ''
        return num
      }
    }
  }
</script>
<style>
  .messageBox {
  }
  .message {
    border: 1px solid #dedfe0;
    padding: 10px 0px;
  }
  .message-headimg {
    height: 55px;
    width: 55px;
    border-radius: 50%;
  }
  .message-name {
    color: #000000;
    font-size: 19px;
    font-weight: normal;
  }
  .message-content {
    color: #808080;
    font-size: 15px;
  }
  .message-time {
    color: #999999;
    font-size: 14px;
  }
</style>
