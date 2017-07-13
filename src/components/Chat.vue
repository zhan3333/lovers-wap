<template>
  <div id="chatBody">
    <scroller
      @on-scroll="onScroll"
      lock-x
      :height="scrollerHeight"
      ref="scrollerEvent"
      :bounce=true
      @on-pulldown-loading="onPullDownLoading"
      :use-pulldown="true"
      :pulldown-config="pullDownConfig"
    >
      <div>
        <div v-for="message in messagesList">
          <div v-if="isMeMessage(message)">
            <card :header="{title: 'me'}">
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


    <group style="width:100%;position:absolute;left:0;bottom:0;z-index:100;" id="inputMessage">
      <x-input title="" class="" v-model="content">
        <x-button slot="right" type="primary" mini  @click.native="sendMessage">发送</x-button>
      </x-input>
    </group>
  </div>
</template>
<script>
  import { Group, Cell, XInput, XButton, Card } from 'vux'
  import ViewBox from '../../node_modules/vux/src/components/view-box/index'
  import Scroller from '../../node_modules/vux/src/components/scroller/index'
  import { mapState } from 'vuex'
  export default {
    name: 'chat',
    components: {
      Scroller,
      ViewBox,
      Card,
      Group,
      Cell,
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
        type: 1,
        toUserInfo: {},
        messagePage: {
          page: 1,
          length: 20
        },
        /* 下拉配置 */
        pullDownConfig: {
          content: 'content',
          height: 60,
          autoRefresh: false,
          downContent: '更多',
          upContent: '可以松开啦',
          loadingContent: '加载中...',
          clsPrefix: 'xs-plugin-pulldown-'
        },
        inputMessageHeight: 0
      }
    },
    created () {
      this.initUserId()
      this.initHistoryMessage()
      this.initSocketListen()
    },
    mounted () {
      this.inputMessageHeight = this.getInputMessageHeight()
    },
    methods: {
      /* 发送消息 */
      sendMessage: function () {
        this.$api.chat.sendMessage({
          type: this.type,
          to: this.toUserId,
          content: this.content
        }).then((result) => {
          this.content = ''   // 清除输入框
          let message = result.message
          message.name = result.user.name
          this.messagesList.push(result.message)
          this.resetScroller()
        })
      },
      /* 获取传递过来的userId */
      initUserId () {
        /* 检查userId是否存在 */
        if (this.$route.params.userId === undefined) {
          this.$router.push('home')
        } else {
          this.toUserId = this.$route.params.userId
          /* 查询好友资料 设置标题 */
          this.$api.user.getUserInfo(this.toUserId)
            .then((result) => {
              this.toUserInfo = result.user
              this.$store.state.title = this.toUserInfo.name
            })
        }
      },
      /* 初始化历史消息 */
      initHistoryMessage () {
        if (!this.toUserId) {
          this.$router.push('home')
          return
        }
        this.$api.chat.getHistoryMessageList({
          page: this.messagePage.page,
          length: this.messagePage.length,
          userId: this.toUserId
        }).then((result) => {
          if (!this._.isEmpty(result.messages)) {
            this.messagePage.page = this.messagePage.page + 1
            this.messagesList = result.messages.reverse()
            this.resetScroller()
          }
        })
      },
      /* 聊天列表下拉事件 */
      onPullDownLoading () {
        if (!this.toUserId) {
          this.$router.push('home')
          return
        }
        this.$api.chat.getHistoryMessageList({
          page: this.messagePage.page,
          length: this.messagePage.length,
          userId: this.toUserId
        }).then((result) => {
          if (!this._.isEmpty(result.messages)) {
            this.messagePage.page = this.messagePage.page + 1
            let messagesList = result.messages.reverse()
            this.messagesList = messagesList.concat(this.messagesList)
            this.resetScroller()
          }
          this.$refs.scrollerEvent.donePulldown()
        })
      },
      /* 返回是否为自己的消息 */
      isMeMessage (message) {
        return message.user_id + '' === this.loginUserId
      },
      /* 监听所在频道 */
      initSocketListen () {
        let echo = this.$util.initEcho()
        echo.private('chat.' + this.loginUserId)
          .listen('SendMessage', (e) => {
            console.log(e)
            let message = e.message
            let user = e.user
            message.name = user.name
            this.$vux.toast.show({
              text: message.name + ': ' + message.content,
              type: 'text'
            })
            this.messagesList.push(message)
          })
          .notification((data) => {
            console.log(data)
          })
      },
      /* 聊天列表滚动事件 */
      onScroll (data) {
//        console.log(data)
      },
      /* 更改数据后刷新列表 */
      resetScroller () {
        this.$nextTick(function () {
          this.$refs.scrollerEvent.reset()
        })
      },
      /* 输入框高度 */
      getInputMessageHeight () {
        let $ = this.$
        let height = $('#inputMessage').outerHeight(true)
        return height
      }
    },
    computed: {
      ...mapState({
        appHeight: state => state.appHeight,
        headerHeight: state => state.headerHeight
      }),
      /* 登陆用户id */
      loginUserId: function () {
        return this.$store.state.user.loginInfo.uid + ''
      },
      /* 聊天列表高度 */
      scrollerHeight: function () {
        return this.appHeight - this.headerHeight - this.inputMessageHeight + 'px'
      }
    },
    watch: {
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
  .boxItem {
    position: relative;
  }
</style>
