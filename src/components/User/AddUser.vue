<template>
  <div>
    <h2>新建用户</h2>
    <ui-textbox icon="person" floating-label label="用户名" v-model="con.username" autocomplete="off"></ui-textbox>
    <ui-textbox icon="lock" floating-label label="密码" type="password" placeholder="password" v-model="con.password" autocomplete="off"></ui-textbox>
    <ui-textbox icon="lock" floating-label label="姓名" v-model="con.nickname" autocomplete="off"></ui-textbox>
    <ui-select
          icon='person'
          floating-label
          label='角色'
          :options='roleString'
          v-model='role'
        ></ui-select>
    <ui-button color="primary" icon="check" @click="addClicked" :loading="iswaitting" :disabled="disable">新建</ui-button>
  </div>
</template>
<script>
import fetch from '@/util/fetch.js'
export default {
  data () {
    return {
      roleString: ['超级管理员', '管理员', '用户'],
      role: 2,
      con: {
        username: '',
        password: '',
        nickname: '',
        roleId: 3,
        status: 1
      },
      iswaitting: false
    }
  },
  computed :{
    disable (){
      return this.con.username==''||this.con.password==''||this.con.nickname==''
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
      this.con.roleId = this.roleString.indexOf(this.role)+1
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
