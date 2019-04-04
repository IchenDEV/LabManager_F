<template>
  <div>
    <ui-select :options="years" label="Year" v-model="search.year" @select="getInfo"></ui-select>
    <ou-spinner v-if="isWaitting" label="Loading..." type="large"/>
    <ve-line :data="chartData" :settings="chartSettings" v-if="chartData.rows.length>0"></ve-line>
    <Card class="ms-depth-16" v-if="chartData.rows.length==0">No Data</Card>
  </div>
</template>
<script>
import tools from "@/util/tools.js";
import VeLine from "v-charts/lib/line.common";
export default {
  props: { device: { default: "0" } },
  components: { VeLine },
  data() {
    this.chartSettings = {
      metrics: ["count", "rate"],
      dimension: ["monthX"]
    };
    return {
      chartData: {
        columns: ["monthX", "count", "rate"],
        rows: []
      },
      search: { year: "2019" },
      years: ["2018", "2019", "2020"],
      isWaitting: true
    };
  },
  methods: {
    getInfo() {
      this.isWaitting = true;
      if (this.device != "0") {
        this.search.device = this.device;
      }
      tools.easyfetch(tools.Api.ListMonthCount, this.search).then(res => {
        this.info = res.data.info;
        this.chartData.rows.splice(0, this.chartData.rows.length);
        for (let item of res.data.info.list) {
          this.chartData.rows.push({
            monthX: item.month.toString(),
            count: item.count,
            rate: item.rate
          });
        }
        this.isWaitting = false;
      });
    },
    onPageChange(page) {
      this.search.pageNum = page;
      this.getInfo();
    },
    exportExcel() {
      this.isWaitting = true;
      tools.fetchFile(tools.Api.ExportDevice, null).then();
    }
  },
  watch: {
    device() {
      if (this.device != "0") {
        this.search.device = this.device;
      }
      this.getInfo();
    }
  },
  mounted() {
    this.getInfo();
  }
};
</script>