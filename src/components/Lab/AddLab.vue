<template>
  <div>
    <h2>{{$t('message.create')}} {{$t('message.lab')}}</h2>
    <!--将名称的图标进行修改为info_outline-->
    <ui-textbox icon="info_outline" floating-label :label="$t('message.name')" v-model="con.name"></ui-textbox>
    <ui-textbox icon="lock" floating-label :label="$t('message.description')" v-model="con.description"></ui-textbox>
    <ui-textbox icon="not_listed_location" floating-label :label="$t('message.location')" v-model="con.location"></ui-textbox>
    <ui-button color="primary" icon="check" @click="addClicked" :loading="iswaitting" :disabled="disable">{{$t('message.create')}}</ui-button>
  </div>
</template>
<script>
import tools from '@/util/tools.js'
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
      tools.easyfetch(tools.Api.AddLab,this.con)
      this.iswaitting = false
      this.$emit('added')
    }
  }
}
</script>
