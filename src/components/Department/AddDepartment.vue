<template>
  <div class="add-department">
    <h2>{{$t('message.create')}} {{$t('message.department')}}</h2>
    <!--将管理页面中部门页面的名称和描述图标改为info_outline-->
    <ui-textbox icon="info_outlinen" floating-label :label="$t('message.name')" v-model="con.name"></ui-textbox>
    <ui-textbox icon="info_outline" floating-label :label="$t('message.description')" v-model="con.description"></ui-textbox>
    <ui-button color="primary" icon="check" @click="addClicked" :disabled="disable" :loading="iswaitting">{{$t('message.create')}}</ui-button>
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
      tools.easyfetch(tools.Api.AddDepartment,this.con)
      .then(() => {
          this.iswaitting = false
          this.$emit('added')
      })
    }
  }
}
</script>
