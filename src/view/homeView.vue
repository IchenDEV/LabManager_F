<template>
  <div class="flex-panel">
    <Card v-if="$store.state.hasSingin">
       <p slot="title">发送信息</p>
       <send-msg label="接收方"></send-msg>
    </Card>
    <Card v-if="$store.state.hasSingin">
       <p slot="title">我的预定信息</p>
       <book-box></book-box>
    </Card>
    <Card v-if="$store.state.hasSingin">
       <p slot="title">通信信息</p>
       <msg-box></msg-box>
    </Card>
    <Card style="width:70%;">
       <p slot="title">个人信息</p>
       <current-user-box simple='true'></current-user-box>
    </Card>
  </div>
</template>
<script>
import CurrentUserBox from '@/components/CurrentUserBox/CurrentUserBox'
import MsgBox from '@/components/Msg/MsgBox'
import BookBox from '@/components/Book/BookBox'
import SendMsg from '@/components/Msg/SendMsg'
export default {
  components: { CurrentUserBox,MsgBox,SendMsg,BookBox}
}
</script>
