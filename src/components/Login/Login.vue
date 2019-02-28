<template>
  <div>
    <ui-textbox icon='person' floating-label :label="$t('message.username')" v-model='username'></ui-textbox>
    <ui-textbox icon='lock' floating-label :label="$t('message.password')" v-model='password' type='password'></ui-textbox>
    <ui-button color='primary' icon='check' @click='LonginClicked' :loading='iswaitting' :disabled='showLoginBt'>{{$t('message.login')}}</ui-button>
  </div>
</template>
<script>

import VueNotifications from 'vue-notifications'
import fetch from '@/util/fetch.js'
import tools from '@/util/tools.js'
import router from '@/router'
export default {
  name: 'Login',
  data () {
    return {
      iswaitting: false,
      username: '',
      password: ''
    }
  },
  computed :{
    showLoginBt (){
      return this.username===''||this.password===''
    }
  },
  methods: {
    LonginClicked () {
      let code=tools.sha3(this.password)
      let con = { username: this.username, password: code }
      this.iswaitting = true
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/login/auth',
        data: JSON.stringify(con)
      })
        .then(res => {  
          if (res.data.info.loginCode === 0) {
            this.showSuccessMsg({ title: 'Welcome' })
            this.$store.dispatch('getInfo')
            router.push('/home')
          } else {
            this.showWarnMsg()
          }
          this.iswaitting = false
        })
        .catch()
    }
  },
  notifications: {
    showSuccessMsg: {
      type: VueNotifications.types.success,
      title: 'Hello ',
      message: '登录成功'
    },
    showWarnMsg: {
      type: VueNotifications.types.warn,
      title: '登录失败',
      message: '可能你输入了不正确的密码或者用户名'
    },
    showErrorMsg: {
      type: VueNotifications.types.error,
      title: 'Wow-wow',
      message: 'Thats the error'
    }
  }
}
</script>
