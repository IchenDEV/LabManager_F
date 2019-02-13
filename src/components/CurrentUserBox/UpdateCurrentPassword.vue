<template>
  <div>
    <div v-if='hasSingin'>
      <div class='user-panel'>
        <ui-textbox icon='lock' floating-label label='密码' v-model='password' type='password'></ui-textbox>
      </div>
      <ui-button  color='primary' icon='adjust' @click='mohandle' :loading='iswaitting'>修改密码</ui-button>
    </div>
  </div>
</template>
<script>
import fetch from '@/util/fetch.js'
export default {
  data () {
    return {
      iswaitting: false,
      password: ''
    }
  },
  computed: {
    hasSingin () {
      return this.$store.state.hasSingin
    },
    buttonEnable () {
      return this.password !== '' &&this.password !== null&& this.$store.state.hasSingin === true
    }
  },
  methods: {
    mohandle () {
      if (this.password !== '' &&this.password !== null&& this.$store.state.hasSingin === true) {
        const JsSHA = require('jssha')
        var shaObj = new JsSHA('SHA3-256', 'TEXT')
        shaObj.update(this.password)
        let code = shaObj.getHash('HEX')
        let data={username:this.$store.state.currentUser.username,password:code}
        fetch({
          method: 'Post',
          url: this.$store.state.host + '/login/updatePassword',
          data: JSON.stringify(data)
        })
          .then(res => {
            if (res.data.code === '100') {
              this.$emit('close')
            }
            this.iswaitting = false
          })
          .catch()
      }
    }
  }
}
</script>
<style>
.user-panel {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 1.1rem;
}
.user-panel > span {
  margin: 10px;
  padding: 10px;
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
  width: 150px; /* 让过渡表现良好。（从/到'width:auto'的过渡
                      至少在 Gecko 和 Webkit 上是有 bug 的。
                      更多信息参见 http://bugzil.la/731886 ） */

  -webkit-transition: width 0.7s ease-out;
  transition: width 0.7s ease-out;
}
</style>
