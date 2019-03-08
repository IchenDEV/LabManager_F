<template>
  <div>
    <h2>{{$t('message.totalUseRate')}}</h2>
    <ve-gauge class="gauge" :data="chartData" :settings="chartSettings"></ve-gauge>
  </div>
</template>
<script>
import VeGauge from "v-charts/lib/gauge.common";
import tools from "@/util/tools.js";
export default {
  components:{VeGauge},
  data() {
    this.chartSettings = {
      dataType: {
        percent: "percent"
      },
      seriesMap: {
        percent: {
          min: 0,
          max: 1
        }
      }
    };
    return {
      iswaitting: false,
      chartData: {
        columns: ["type", "value"],
        rows: [{ type: "percent", value: 0.8 }]
      }
    };
  },
  methods: {
    getInfo() {
      tools.easyfetch(tools.Api.TotalUseRate, null).then(res => {
        this.chartData.rows[0].value = res.data.info.TotalUseRate;
      });
    }
  },
  mounted() {
    this.getInfo();
  }
};
</script>
<style>
.gauge {
  min-width: 400px;
  min-height: 400px;
}
</style>
