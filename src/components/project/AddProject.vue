<template>
  <div class="add-project">
    <h2>{{$t('message.create')}} {{$t('message.project')}}</h2>
    <!--将名称的图标进行修改为info_outline，描述图标修改-->
    <ui-textbox icon="info_outline" floating-label :label="$t('message.name')" v-model="con.name"></ui-textbox>
    <ui-textbox icon="description" floating-label :label="$t('message.description')" v-model="con.description"></ui-textbox>
    <span>
    <ui-datepicker
                icon="events"
                floating-label
                v-model="beginDate"
            >{{$t('message.beginDate')}}</ui-datepicker>
    <TimePicker class="timepick" style="display:block" type="time" placeholder="Select time" v-model="beginTime"></TimePicker>
    </span>
    <span style="margin-buttom:20px;">
    <ui-datepicker
                icon="events"
                floating-label
                v-model="endDate"
            >{{$t('message.endDate')}}</ui-datepicker>
    <TimePicker style="display:block" class="timepick" type="time" placeholder="Select time" v-model="endTime" ></TimePicker>
    </span>
    <ui-button color="primary" icon="check" @click="addClicked" :loading="iswaitting" :disabled="disable">{{$t('message.create')}}</ui-button>
  </div>
</template>
<script>
import tools from '@/util/tools.js'
export default {
  data () {
    return {
      beginDate:null,
      endDate:null,
      beginTime:null,
      endTime:null,
      con: {
        name: '',
        description: '',
        beginTime: null,
        endTime: null,
        status: 1
      },
      iswaitting: false
    }
  },
  computed :{
    disable (){
      return this.con.name==''||this.con.description==''||this.beginDate==null||this.endDate==null||this.beginTime==null||this.endTime==null
    }
  },
  methods: {
    addClicked () {
      this.iswaitting = true
      this.con.beginTime=this.beginDate.getFullYear()+'-'+(new Number(this.beginDate.getMonth())+1)+ '-'+this.beginDate.getDate()+' '+this.beginTime
      this.con.endTime=this.endDate.getFullYear()+'-'+(new Number(this.endDate.getMonth())+1)+ '-'+this.endDate.getDate()+' '+this.endTime
      tools.easyfetch(tools.Api.AddProject,this.con).then(()=>{
        this.iswaitting = false
        this.$emit('added')
      })
      
    }
  }
}
</script>
<style>
.timepick .ivu-date-picker{
  display: block;
}
.ivu-picker-panel-body{
  z-index: 9999;
}
</style>
