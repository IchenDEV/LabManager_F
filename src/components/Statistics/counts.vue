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
          columns: ['name', 'value'],
          rows: []
        }
      }
  },
  methods: {
    getInfo() {
      tools.easyfetch(tools.Api.Counts,null).then(res=>{
        this.barData.rows.push({name:this.$t('message.book'),value:res.data.info.devices});
          this.barData.rows.push({name:this.$t('message.user'),value:res.data.info.users});
          this.barData.rows.push({name:this.$t('message.message'),value:res.data.info.messages});
          this.barData.rows.push({name:this.$t('message.lab'),value:res.data.info.labs});
          this.barData.rows.push({name:this.$t('message.project'),value:res.data.info.projects});
          this.barData.rows.push({name:this.$t('message.group'),value:res.data.info.groups});
          this.barData.rows.push({name:this.$t('message.department'),value:res.data.info.departments});
      })
    }
  },
  mounted() {
    this.getInfo();
  }
};
</script>