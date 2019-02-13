<template>
  <div class="add-project">
    <h2>添加项目</h2>
    <ui-textbox icon="person" floating-label label="名称" v-model="con.name"></ui-textbox>
    <ui-textbox icon="dock" floating-label label="描述" v-model="con.description"></ui-textbox>
    <span>
    <ui-datepicker
                icon="events"
                floating-label
                v-model="beginDate"
            >开始日期</ui-datepicker>
    <TimePicker class="timepick" type="time" placeholder="Select time" v-model="beginTime"></TimePicker>
    </span>
    <span>
    <ui-datepicker
                icon="events"
                floating-label
                v-model="endDate"
            >结束日期</ui-datepicker>
    <TimePicker class="timepick" type="time" placeholder="Select time" v-model="endTime" ></TimePicker>
    </span>
    <ui-button color="primary" icon="check" @click="addClicked" :loading="iswaitting">新建</ui-button>
  </div>
</template>
<script>
import fetch from '@/util/fetch.js'
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
  methods: {
    addClicked () {
      this.iswaitting = true
      this.con.beginTime=this.beginDate.getFullYear()+'-'+(new Number(this.beginDate.getMonth())+1)+ '-'+this.beginDate.getDate()+' '+this.beginTime
      this.con.endTime=this.endDate.getFullYear()+'-'+(new Number(this.endDate.getMonth())+1)+ '-'+this.endDate.getDate()+' '+this.endTime
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/project/addProject',
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
.timepick .ivu-date-picker{
  display: block
}
</style>
