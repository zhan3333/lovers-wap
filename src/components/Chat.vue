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
        <flexbox orient="vertical" v-for="message in chatMessageList" :gutter="0">
          <flexbox-item v-if="isMeMessage(message)">
            <flexbox :gutter="0">
              <flexbox-item :span="2"><div></div></flexbox-item>
              <flexbox-item :span="8"><div class="isMeMessage">{{message.content}}</div></flexbox-item>
              <flexbox-item :span="2">
                <div style="text-align:center"><img src="/static/img/headimg/default.jpg"  style="height: 36px; width: 36px"></div>
              </flexbox-item>
            </flexbox>
          </flexbox-item>
          <flexbox-item v-else>
            <flexbox :gutter="0">
              <flexbox-item :span="2">
                <div style="text-align:center"><img src="/static/img/headimg/default-2.jpg"  style="height: 36px; width: 36px"></div>
              </flexbox-item>
              <flexbox-item :span="8"><div class="otherMessage">{{message.content}}</div></flexbox-item>
              <flexbox-item :span="2"><div></div></flexbox-item>
            </flexbox>
          </flexbox-item>
        </flexbox>
      </div>
    </scroller>

    <group style="width:100%;position:absolute;left:0;bottom:0;z-index:100;" id="inputMessage" gutter="0px">
      <x-input title="" class="" v-model="content">
        <x-button slot="right" type="primary" mini  @click.native="sendMessage">发送</x-button>
      </x-input>
    </group>
  </div>
</template>
<script>
  import { Group, Cell, XInput, XButton, Card, Flexbox, FlexboxItem, Scroller } from 'vux'
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'chat',
    components: {
      Flexbox,
      FlexboxItem,
      Scroller,
      Card,
      Group,
      Cell,
      XInput,
      XButton
    },
    data () {
      return {
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
      this.initToUserId()
      this.initHistoryMessage()
    },
    mounted () {
      this.inputMessageHeight = this.getInputMessageHeight()
    },
    methods: {
      ...mapActions([
        'updateChatToUserId', 'changePageTitle', 'addMessagesList', 'setChatMessageList', 'addChatMessage'
      ]),
      /* 发送消息 */
      sendMessage: function () {
        this.$vux.loading.show({
          text: '发送中...'
        })
        this.$api.chat.sendMessage({
          type: this.type,
          to: this.toUserId,
          content: this.content
        }).then((result) => {
          let sendContent = this.content
          this.content = ''   // 清除输入框
          let message = result.message
          message.name = result.user.name
          // 设置聊天消息
          this.addChatMessage(result.message)
          // 设置消息
          this.addMessagesList({
            name: this.toUserInfo.name,
            headimg: '/static/img/headimg/default.jpg',
            lastMessage: sendContent,
            time: new Date(),
            num: 0,
            toId: this.toUserId,
            type: 1,
            id: this.loginUserId
          })
          this.resetScroller(true)
          this.$vux.loading.hide()
        }).catch((err) => {
          console.error(err)
          this.$vux.loading.hide()
          this.$vux.toast.show({
            text: '发送失败',
            type: 'warn'
          })
        })
      },
      /* 获取传递过来的userId */
      initToUserId () {
        let toUserId = ''
        if (this.$route.params.userId === undefined) {
          toUserId = this.$store.state.chat.chatToUserId
          if (!toUserId) {
            this.$router.replace('home')
          }
        } else {
          toUserId = this.$route.params.userId
        }
        this.toUserId = toUserId
        this.updateChatToUserId(this.toUserId)
        /* 查询好友资料 设置标题 */
        this.$api.user.getUserInfo(this.toUserId)
          .then((result) => {
            if (result.user) {
              this.toUserInfo = {...result.user}
              this.changePageTitle(this.toUserInfo.name)
            }
          })
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
            this.setChatMessageList(result.messages.reverse())  // 恢复历史消息
            this.resetScroller(true)
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
            this.setChatMessageList(messagesList.concat(this.messagesList))
            this.resetScroller()
          }
          this.$refs.scrollerEvent.donePulldown()
        })
      },
      /* 返回是否为自己的消息 */
      isMeMessage (message) {
        return message.user_id + '' === this.loginUserId
      },
      /* 聊天列表滚动事件 */
      onScroll (data) {
//        console.log(data)
      },
      /* 更改数据后刷新列表 */
      resetScroller (toBottom = false) {
        this.$nextTick(function () {
          let top = 0
          if (this.$refs.scrollerEvent) {
            if (toBottom) {
              let scrollHeight = this.$(this.$refs.scrollerEvent.$el).children()[0].scrollHeight
              /* scroller下滑到底部需要的高度  */
              top = scrollHeight - (this.appHeight - this.headerHeight - this.inputMessageHeight)
              if (top < 0) top = 0
            }
            this.$refs.scrollerEvent.reset({top})
          }
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
        headerHeight: state => state.headerHeight,
        chatMessageList: state => state.chat.chatMessageList
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
      /* 监听聊天消息变化事件 */
      chatMessageList: {
        handler: function (val, oldVal) {
          this.resetScroller(true)
        },
        deep: true
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
  .boxItem {
    position: relative;
  }
</style>
