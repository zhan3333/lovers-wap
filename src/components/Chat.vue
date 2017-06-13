<template>
  <div>
    <scroller lock-x scrollbar-y height="-115">
      <div>
        <group v-for="message in messageList">
          <cell>{{message}}</cell>
        </group>
      </div>
    </scroller>
    <group >
      <x-input title="" class="" v-model="message">
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
        messageList: [

        ],
        /* 用户输入消息内容 */
        message: '',
        toUserId: 0,
        type: 1
      }
    },
    created () {
      this.initUserId()
    },
    methods: {
      /* 发送消息 */
      sendMessage () {
        this.httpRequest.post('/chat/sendMessage', {
          type: this.type,
          to: this.toUserId,
          content: this.message
        }).then(function (response) {
          console.log(this)
          if (response.data.error_code === '0') {
            this.messageList.push(this.message)
            this.message = ''
            console.log('发送成功', response)
          }
        }).catch(function (err) {
          console.error('发送失败', err)
        })
      },
      initUserId () {
        if (this.$route.params.userId === undefined) {
//          this.$router.push('home')
        }
        this.toUserId = this.$route.params.userId
      }
    }
  }
</script>

<style>
</style>
