<template>
  <div class="chatList">
    <div style="height: 100%">
      <view-box>
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
      </view-box>
    </div>

    <group style="width:100%;position:absolute;left:0;bottom:0;z-index:100;">
      <x-input title="" class="" v-model="content">
        <x-button slot="right" type="primary" mini  @click.native="sendMessage">发送</x-button>
      </x-input>
    </group>
  </div>
</template>
<script>
  import { Group, Cell, Scroller, Flexbox, FlexboxItem, XInput, XButton, Card } from 'vux'
  import ViewBox from '../../node_modules/vux/src/components/view-box/index'

  export default {
    components: {
      ViewBox,
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
      let $ = this.$
      let headerHeight = $('#header').outerHeight(true)
      console.log(headerHeight)
      $('.chatList').css({
        'margin-top': '100px',
        'color': 'white',
        'background-color': '#98bf21',
        'font-family': 'Arial',
        'font-size': '20px',
        'padding': '5px'
      })
      console.log($('#chatList').css('color'))
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
      /* 监听所在频道 */
      initSocketListen () {
        console.log('111111111111')
        let echo = this.$util.initEcho()
        echo.private('chat.' + this.loginUserId)
          .listen('SendMessage', (e) => {
            let message = e.message
            console.log(message)
            this.messagesList.push(message)
          })
          .notification((data) => {
            console.log(data)
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
