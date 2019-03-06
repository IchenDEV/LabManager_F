<template>
  <div>
    <h1>{{$t('message.personalInfo')}}</h1>
   <vue-qr v-if="qrid!=0" :text='qrid' qid='testid' style="border-radius:10px;"></vue-qr>
   <Card class="margin10">
   <current-user-box></current-user-box>
   </Card>
  </div>
</template>
<script>
import VueQr from 'vue-qr'
import CurrentUserBox from '@/components/CurrentUserBox/CurrentUserBox'
export default {
  name: 'myView',
  components: {VueQr, CurrentUserBox},
  data () {
    return {
      qrid: this.$store.state.currentUser.id.toString()
    }
  }
}
</script>
<style>
.margin10{
  margin: 10px;
}
</style>

