<template>
  <div>
    <ui-textbox icon="person" floating-label :label="$t('message.username')" v-model="username"></ui-textbox>
    <ui-textbox icon="person" floating-label :label="$t('message.Uname')" v-model="nickname"></ui-textbox>
    <ui-textbox
      icon="lock"
      floating-label
      :label="$t('message.password')"
      v-model="password"
      type="password"
    ></ui-textbox>
    <ui-textbox
      icon="lock"
      floating-label
      :label="$t('message.password')"
      v-model="password2"
      :invalid="password2!=password"
      type="password"
    ></ui-textbox>
    <ui-button
      color="primary"
      icon="check"
      @click="SingUpClicked"
      :loading="iswaitting"
      :disabled="!isFullInputed"
    >{{$t('message.singup')}}</ui-button>
  </div>
</template>
<script>
import VueNotifications from 'vue-notifications'
import fetch from '@/util/fetch.js'
import tools from '@/util/tools.js'
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
  computed:{
    isFullInputed(){
      return (this.password == this.password2)&& this.password2!= '' &&
        this.username != '' && this.nickname != ''
    }
  },
  methods: {
    SingUpClicked () {
      if (this.isFullInputed) {   
        let con = {
          username: this.username,
          password: tools.sha3(this.password),
          nickname: this.nickname
        }
        this.iswaitting = true
        fetch({
          method: 'Post',
          url: this.$store.state.host+ '/singUp',
          data: JSON.stringify(con)
        })
          .then(res => {
            if (res.data.code === '100') {
              this.showSuccessMsg({ title:'注册成功'+'现在你可以登录'+ this.username })
            } else {
              this.showErrorMsg({title: res.data.msg})
            }
            this.iswaitting = false
          })
          .catch()
      }
    },
    
  },
  notifications: {
    showSuccessMsg: {
      type: VueNotifications.types.success,
      title: 'Hello ',
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
