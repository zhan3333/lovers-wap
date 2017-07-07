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
      sendMessage: function () {
        this.$api.chat.sendMessage({
          type: this.type,
          to: this.toUserId,
          content: this.message
        })
      },
      initUserId () {
        console.log(this.$route.params.userId)
        if (this.$route.params.userId === undefined) {
          this.$router.go(-1)
        }
        this.toUserId = this.$route.params.userId
      }
    }
  }
</script>

<style>
</style>
