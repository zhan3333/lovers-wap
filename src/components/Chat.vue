<template>
  <div>
    <scroller lock-x scrollbar-y height="-115">
      <div>
        <group v-for="message in messagesList">
          <cell>{{message.content}}</cell>
        </group>
      </div>
    </scroller>
    <group >
      <x-input title="" class="" v-model="content">
        <x-button slot="right" type="primary" mini  @click.native="sendMessage">发送</x-button>
      </x-input>
    </group>
  </div>
</template>

<script>
  import { Group, Cell, Scroller, Flexbox, FlexboxItem, XInput, XButton } from 'vux'

  export default {
    components: {
      Group,
      Cell,
      Scroller,
      Flexbox,
      FlexboxItem,
      XInput,
      XButton
    },
    data () {
      return {
        /* 消息列表 */
        messagesList: [

        ],
        /* 用户输入消息内容 */
        content: '',
        toUserId: 0,
        type: 1
      }
    },
    created () {
      this.initUserId()
      this.initHistoryMessage()
    },
    methods: {
      /* 发送消息 */
      sendMessage: function () {
        this.$api.chat.sendMessage({
          type: this.type,
          to: this.toUserId,
          content: this.content
        })
      },
      /* 获取传递过来的userId */
      initUserId () {
        /* 检查userId是否存在 */
        if (this.$route.params.userId === undefined) {
          this.$router.go(-1)
        }
        this.toUserId = this.$route.params.userId
      },
      /* 初始化历史消息 */
      initHistoryMessage () {
        this.$api.chat.getHistoryMessageList({
          length: 20,
          userId: this.toUserId
        }).then((result) => {
          this.messagesList = result.messages
        })
      }
    },
    computed: {
      /* 取最后一个消息的id */
      minMessageId: function () {
        if (this.messagesList) {
          let lastMessage = this._.last(this.messagesList)
          return lastMessage.id
        }
      }
    }
  }
</script>

<style>
</style>
