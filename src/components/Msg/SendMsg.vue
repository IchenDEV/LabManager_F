<template>
  <div class="add-department">
    <user-selector v-model="s" :label="label"></user-selector>
    <ui-textbox icon="lock" floating-label label="信息" v-model="con.msg"></ui-textbox>
    <ui-button color="primary" icon="check" @click="addClicked" :loading="iswaitting" :disabled="con.msg===''||con.msg===null||s===null">发送</ui-button>
  </div>
</template>
<script>
import fetch from '@/util/fetch.js'
import userSelector from '@/components/User/UserSelector'
export default {
  components: { userSelector },
  props: { label: { default: '用户' }},
  data () {
    return {
      s:{userId:10003,username:'admin'},
      con: {
        receiver:0,
        msg: null,
        author: this.$store.state.currentUser.id,
        status: 1
      },
      iswaitting: false
     
    }
  },
  methods: {
    addClicked () {
      this.iswaitting = true
      /* eslint-disable */
      this.con.receiver = this.s.userId
      console.log(this.s)
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/msg/addMsg',
        data: JSON.stringify(this.con)
      })
        .then(() => {
          this.iswaitting = false
        })
        .catch()
    }
  }
}
</script>
