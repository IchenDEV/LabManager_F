<template>
  <div>
    <h2>{{$t('message.counts')}}</h2>
  <ve-bar :data="barData" :settings="barSettings"></ve-bar>
  </div>
</template>
<script>
import tools from "@/util/tools.js";
import VeBar from "v-charts/lib/bar.common";
export default {
  components:{VeBar},
  data() {
    this.barSettings = {
        dimension: ['name'],
        metrics: ['value']
      }
      return {
        
        barData: {
          columns: ['item', 'value'],
          rows: []
        }
      }
  },
  methods: {
    getInfo() {
      tools.easyfetch(tools.Api.Counts,null).then(res=>{
        this.barData.rows.push({name:'Equipment',value:res.data.info.devices});
          this.barData.rows.push({name:'User',value:res.data.info.users});
          this.barData.rows.push({name:'messages',value:res.data.info.messages});
          this.barData.rows.push({name:'labs',value:res.data.info.labs});
          this.barData.rows.push({name:'projects',value:res.data.info.projects});
          this.barData.rows.push({name:'groups',value:res.data.info.groups});
          this.barData.rows.push({name:'departments',value:res.data.info.departments});
      })
    }
  },
  mounted() {
    this.getInfo();
  }
};
</script>