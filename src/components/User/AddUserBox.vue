<template>
  <div class="add-user">
    <ui-textbox icon="person" floating-label label="名称" v-model="con.name"></ui-textbox>
    <ui-textbox icon="lock" floating-label label="描述" v-model="con.description"></ui-textbox>
    <ui-textbox icon="lock" floating-label label="位置" v-model="con.location"></ui-textbox>
    <ui-button color="primary" icon="check" @click="addClicked" :loading="iswaitting">新建</ui-button>
  </div>
</template>
<script>
import fetch from '@/util/fetch.js'
export default {
  data () {
    return {
      con: {
        name: '',
        description: '',
        location: '',
        status: 1
      },
      iswaitting: false
    }
  },
  methods: {
    addClicked () {
      this.iswaitting = true
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/user/addUser',
        data: JSON.stringify(this.con)
      })
        .then(res => {
         
          this.iswaitting = false
        })
        .catch(function (err) {
          
        })
    }
  }
}
</script>
<style>
</style>
