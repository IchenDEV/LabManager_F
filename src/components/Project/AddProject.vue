<template>
  <div class="add-project">
    <h2>{{ $t('message.create') }} {{ $t('message.project') }}</h2>
    <ui-textbox
      v-model="con.name"
      icon="person"
      floating-label
      :label="$t('message.name')"
    />
    <ui-textbox
      v-model="con.description"
      icon="dock"
      floating-label
      :label="$t('message.description')"
    />
    <span>
      <ui-datepicker
        v-model="beginDate"
        icon="events"
        floating-label
      >{{ $t('message.beginDate') }}</ui-datepicker>
      <TimePicker
        v-model="beginTime"
        class="timepick"
        style="display:block"
        type="time"
        placeholder="Select time"
      />
    </span>
    <span style="margin-buttom:20px;">
      <ui-datepicker
        v-model="endDate"
        icon="events"
        floating-label
      >{{ $t('message.endDate') }}</ui-datepicker>
      <TimePicker
        v-model="endTime"
        style="display:block"
        class="timepick"
        type="time"
        placeholder="Select time"
      />
    </span>
    <ui-button
      color="primary"
      icon="check"
      :loading="iswaitting"
      :disabled="disable"
      @click="addClicked"
    >
      {{ $t('message.create') }}
    </ui-button>
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
