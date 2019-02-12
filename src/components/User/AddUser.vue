<template>
  <div class="add-user">
    <ui-textbox icon="person" floating-label label="用户名" v-model="con.username"></ui-textbox>
    <ui-textbox icon="lock" floating-label label="密码" v-model="con.password"></ui-textbox>
    <ui-textbox icon="lock" floating-label label="姓名" v-model="con.nickname"></ui-textbox>
    <ui-textbox icon="lock" floating-label label="角色id" v-model="con.roleId"></ui-textbox>
    <ui-button color="primary" icon="check" @click="addClicked" :loading="iswaitting">新建</ui-button>
  </div>
</template>
<script>
import fetch from '@/util/fetch.js'
export default {
  data () {
    return {
      con: {
        username: '',
        password: '',
        nickname: '',
        roleId: '',
        status: 1
      },
      iswaitting: false
    }
  },
  methods: {
    addClicked () {
      this.iswaitting = true
      const JsSHA = require('jssha')
      var shaObj = new JsSHA('SHA3-256', 'TEXT')
      shaObj.update(this.con.password)
      let code = shaObj.getHash('HEX')
      this.con.password = code
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/user/addUser',
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
<style>
</style>
