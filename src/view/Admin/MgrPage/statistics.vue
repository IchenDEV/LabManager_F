<template>
<div>
  <h1>{{$t('message.statistics')}}</h1>
  <Card>
  <h2>{{$t('message.totalUseRate')}}</h2>
  <ve-gauge class="gauge"  :data="chartData" :settings="chartSettings"></ve-gauge>
  </Card>
  <Card>
  <h2>{{$t('message.counts')}}</h2>
  <ve-bar :data="barData" :settings="barSettings"></ve-bar>
  </Card>
</div>
</template>
<script>
import fetch from "@/util/fetch.js";
export default {
    data () {
      this.chartSettings = {
        dataType: {
          '占比': 'percent'
        },
        seriesMap: {
          '占比': {
            min: 0,
            max: 1
          }
        }
      },
      this.barSettings = {
        dimension: ['name'],
        metrics: ['value']
      }
      return {
        chartData: {
          columns: ['type', 'value'],
          rows: [
            { type: '占比', value: 0.8 }
          ]
        },
        barData: {
          columns: ['item', 'value'],
          rows: []
        }
      }
    },
    methods:{
      getUseRate(){
        let da={id:0}
        fetch({
        method: "Post",
        url: this.$store.state.host + "/analyse/totalUseRate",
        data: JSON.stringify(da)
      })
        .then(res => {
          /* eslint-disable */
          console.log(res);
          this.chartData.rows[0].value= res.data.info.TotalUseRate
          this.$store.commit("onDataReached", res.data,this); 
        })
        .catch();
      },
       getCounts(){
        let da={id:0}
        fetch({
        method: "Post",
        url: this.$store.state.host + "/analyse/count",
        data: JSON.stringify(da)
      })
        .then(res => {
          this.barData.rows.push({name:'Equipment',value:res.data.info.devices});
          this.barData.rows.push({name:'User',value:res.data.info.users});
          this.barData.rows.push({name:'messages',value:res.data.info.messages});
          this.barData.rows.push({name:'labs',value:res.data.info.labs});
          this.barData.rows.push({name:'projects',value:res.data.info.projects});
          this.barData.rows.push({name:'groups',value:res.data.info.groups});
          this.barData.rows.push({name:'departments',value:res.data.info.departments});
          this.$store.commit("onDataReached", res.data,this); 
        })
        .catch();
      }
    },
    mounted() {
      this.getUseRate();
      this.getCounts();
    }
  }
</script>
<style>
.gauge{
  min-width: 400px;
  min-height: 400px;
}
</style>
