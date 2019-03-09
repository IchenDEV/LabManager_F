<template>
  <div>
    <h2>{{ $t('message.totalUseRate') }}</h2>
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
      icon="adjust"
      :loading="iswaitting"
      @click="bookClick"
    >
      {{ $t('message.search') }}
    </ui-button>
    <ve-gauge
      class="gauge"
      :data="chartData"
      :settings="chartSettings"
    />
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
      },
      beginDate: null,
      endDate: null,
      beginTime: null,
      endTime: null,
      con: {
        beginTime: null,
        endTime: null,
        status: 1
      },
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      tools.easyfetch(tools.Api.TotalUseRate,this.con).then(res => {
        this.chartData.rows[0].value = res.data.info.TotalUseRate;
      });
    },
    bookClick() {
      this.con.beginTime = tools.timeBuilder(this.beginDate, this.beginTime);
      this.con.endTime = tools.timeBuilder(this.endDate, this.endTime);
      this.getInfo();
    }
  }
};
</script>
