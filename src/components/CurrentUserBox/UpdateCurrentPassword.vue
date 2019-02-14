<template>
  <div>
    <div v-if='hasSingin'>
      <div>
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
