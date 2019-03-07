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
        占比: "percent"
      },
      seriesMap: {
        占比: {
          min: 0,
          max: 1
        }
      }
    };
    return {
      iswaitting: false,
      chartData: {
        columns: ["type", "value"],
        rows: [{ type: "占比", value: 0.8 }]
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