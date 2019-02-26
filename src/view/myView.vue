<template>
  <div>
   <vue-qr v-if="qrid!=0" :text='qrid' qid='testid'></vue-qr>
   <current-user-box></current-user-box>
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
