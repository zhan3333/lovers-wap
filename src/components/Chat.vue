<template>
  <div>
    <scroller lock-x scrollbar-y height="-115">
      <div>
        <div v-for="message in messagesList">
          <div v-if="isMeMessage(message)">
            <card :header="{title: message.name}">
              <div slot="content" class="isMeMessage">{{message.content}}</div>
            </card>
          </div>
          <div v-else>
            <card :header="{title: message.name}">
              <div slot="content" class="otherMessage">{{message.content}}</div>
            </card>
          </div>
        </div>
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
  import { Group, Cell, Scroller, Flexbox, FlexboxItem, XInput, XButton, Card } from 'vux'

  export default {
    components: {
      Card,
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
      this.initSocketListen()
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
          this.$router.push('home')
        }
        this.toUserId = this.$route.params.userId
      },
      /* 初始化历史消息 */
      initHistoryMessage () {
        if (!this.toUserId) {
          this.$router.push('home')
          return
        }
        this.$api.chat.getHistoryMessageList({
          length: 20,
          userId: this.toUserId
        }).then((result) => {
          this.messagesList = result.messages
        })
      },
      /* 返回是否为自己的消息 */
      isMeMessage (message) {
        return message.user_id + '' === this.loginUserId
      },
      /* 动态导入js */
      requireChatSocketJs () {
//        this.$.getScript(this.chatSocketJs)
      },
      /* 监听所在频道 */
      initSocketListen () {
        this.Echo.private('chat.' + this.loginUserId)
          .listen('SendMessage', (e) => {
            let message = e.message
            console.info('from:', message.user_id)
            console.log('content:', message.content)
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
      },
      /* 加载socket.io.js的地址 */
      chatSocketJs: function () {
        return this.$variables.config.chatSocketJs
      },
      /* 登陆用户id */
      loginUserId: function () {
        return this.$store.state.user.loginInfo.uid + ''
      }
    }
  }
</script>

<style>
  /* 我的消息 */
  .isMeMessage {
    float: right;
    padding: 10px;
  }
  .otherMessage {
    float: left;
    padding: 10px;
  }
</style>
