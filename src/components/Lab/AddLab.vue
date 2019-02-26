<template>
  <div class="add-lab">
    <h2>{{$t('message.create')}} {{$t('message.lab')}}</h2>
    <ui-textbox icon="person" floating-label :label="$t('message.name')" v-model="con.name"></ui-textbox>
    <ui-textbox icon="lock" floating-label :label="$t('message.description')" v-model="con.description"></ui-textbox>
    <ui-textbox icon="lock" floating-label :label="$t('message.location')" v-model="con.location"></ui-textbox>
    <ui-button color="primary" icon="check" @click="addClicked" :loading="iswaitting" :disabled="disable">{{$t('message.create')}}</ui-button>
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
  computed :{
    disable (){
      return this.con.name==''||this.con.description==''||this.con.location==''
    }
  },
  methods: {
    addClicked () {
      this.iswaitting = true
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/lab/addLab',
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
