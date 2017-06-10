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
        message: ''
      }
    },
    methods: {
      /* 发送消息 */
      sendMessage: function () {
        console.log(this.message)
        console.log(this.messageList)
        console.log(this._)
        this.messageList.push(this.message)
      }
    }
  }
</script>

<style>
</style>
