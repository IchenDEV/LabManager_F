<template>
  <div>
    <ui-textbox icon='person' floating-label label='用户名' v-model='username'></ui-textbox>
    <ui-textbox icon='person' floating-label label='姓名' v-model='nickname'></ui-textbox>
    <ui-textbox icon='lock' floating-label label='密码' v-model='password' type='password'></ui-textbox>
    <ui-textbox icon='lock' floating-label label='重复密码' v-model='password2' type='password'></ui-textbox>
    <ui-button  color='primary' icon='check' @click='SingUpClicked' :loading='iswaitting'>注册</ui-button>
  </div>
</template>
<script>
import VueNotifications from 'vue-notifications'
import fetch from '@/util/fetch.js'
export default {
  data () {
    return {
      iswaitting: false,
      username: '',
      nickname: '',
      password: '',
      password2: '',
      buttonColor: 'primary'
    }
  },
  methods: {
    SingUpClicked () {
      if (
        (this.password === this.password2) !== '' &&
        this.username !== '' &&
        this.nickname !== ''
      ) {
        const JsSHA = require('jssha')
        var shaObj = new JsSHA('SHA3-256', 'TEXT')
        shaObj.update(this.password)
        let code = shaObj.getHash('HEX')
        let con = {
          username: this.username,
          password: code,
          nickname: this.nickname
        }
        this.iswaitting = true
        fetch({
          method: 'Post',
          url: '//localhost:8080/singUp',
          data: JSON.stringify(con)
        })
          .then(res => {
            console.log(res)
            if (res.data.code === '100') {
              this.showSuccessMsg({ title: this.username })
            } else {
              this.showErrorMsg({title: res.data.msg})
            }
            this.iswaitting = false
          })
          .catch(function (err) {
            console.log(err)
            this.showErrorMsg()
          })
      }
    }
  },
  notifications: {
    showSuccessMsg: {
      type: VueNotifications.types.success,
      title: 'Hello ' + this.username,
      message: '注册成功'
    },
    showErrorMsg: {
      type: VueNotifications.types.error,
      title: 'Wow-wow',
      message: '错误'
    }
  }
}
</script>
