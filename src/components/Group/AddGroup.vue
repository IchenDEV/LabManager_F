<template>
  <div class="add-group">
    <h2>{{$t('message.create')}} {{$t('message.group')}}</h2>
    <ui-textbox icon="person" floating-label :label="$t('message.name')" v-model="con.name"></ui-textbox>
    <ui-textbox icon="lock" floating-label :label="$t('message.description')" v-model="con.description"></ui-textbox>
    <ui-button color="primary" icon="check" @click="addClicked" :disabled="disable" :loading="iswaitting">{{$t('message.create')}}</ui-button>
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
        status: 1
      },
      iswaitting: false
    }
  },
  computed :{
    disable (){
      return this.con.name==''||this.con.description==''
    }
  },
  methods: {
    addClicked () {
      this.iswaitting = true
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/group/addGroup',
        data: JSON.stringify(this.con)
      })
        .then(() => {
          this.iswaitting = false
          this.$emit('added')
        })
        .catch()
    }
  }
}
</script>
