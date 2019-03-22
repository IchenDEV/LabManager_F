<template>
  <div>
    <ui-select
    :options="years"
    v-model="search.year"
    @select="getInfo"
  ></ui-select>
    <ve-line  :data="chartData" :settings="chartSettings" ></ve-line>
  </div>
</template>
<script>
import tools from "@/util/tools.js";
import VeLine from "v-charts/lib/line.common";
export default {
  components: { VeLine },
  data() {
    this.chartSettings = {
        metrics: ['count', 'rate'],
        dimension: ['monthX']
      }
     return {
        chartData: {
          columns: ['monthX', 'count', 'rate'],
          rows:[]
        },
        search: {year: '2019'},
        years:['2018','2019','2020']
      }
  },
  methods: {
    getInfo() {
      tools.easyfetch(tools.Api.ListMonthCount, this.search).then(res => {
        this.info = res.data.info;
        this.chartData.rows.splice(0,this.chartData.rows.length);
        for (let item of res.data.info.list) {
          this.chartData.rows.push({ monthX: item.month.toString(),count:item.count, rate: item.rate });
        }
      });
    },
    onPageChange(page) {
      this.search.pageNum = page;
      this.getInfo();
    },
    exportExcel() {
      tools.fetchFile(tools.Api.ExportDevice, null).then(res => {
        this.$store.commit("download", res.data);
      });
    }
  },
  mounted() {
    this.getInfo();
  }
};
</script>