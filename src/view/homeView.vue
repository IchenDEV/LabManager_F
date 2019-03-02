<template>
<div>
  <h1>Home</h1>
  <div class="flex-panel">
    <Card v-if="$store.state.hasSingin">
       <p slot="title">{{$t('message.sendMsg')}}</p>
       <send-msg :label="$t('message.receiver')"></send-msg>
    </Card>
    <Card v-if="$store.state.hasSingin">
       <p slot="title">{{$t('message.myBookInfo')}}</p>
       <book-box></book-box>
    </Card>
    <Card v-if="$store.state.hasSingin">
       <p slot="title">{{$t('message.message')}}</p>
       <msg-box></msg-box>
    </Card>
    <Card style="width:70%;">
       <p slot="title">{{$t('message.personalInfo')}}</p>
       <current-user-box simple='true'></current-user-box>
    </Card>
  </div>
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
