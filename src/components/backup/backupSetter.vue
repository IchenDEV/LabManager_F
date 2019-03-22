<template>
  <div>
    <h2>{{$t('message.lastBackupTime')}}</h2>
    <p v-if="data.lastBackupTime == null">{{$t('message.noBackup')}}</p>
    <Time v-else :time="data.lastBackupTime" :interval="1"/>
    <h2>{{$t('message.setBackupSchedule')}}</h2>
    <ui-textbox icon="access_time" floating-label label="cron" v-model="data.schedule"/>
    <ui-button color="primary" icon="backup" @click="backupClicked" :loading="iswaitting">
      {{$t('message.set')}}
    </ui-button>
  </div>
</template>
<script>
import tools from "@/util/tools.js";
export default {
  data() {
    return {
      iswaitting: false,
      data: {
        schedule: "",
        lastBackupTime: new Date()
      }
    };
  },
  methods: {
    backupClicked() {
      this.$Loading.start();
      tools.easyfetch(tools.Api.SetBackupSchedule, this.data);
      this.$Loading.finish();
    },
    backupGtClicked() {
      this.$Loading.start();
      tools
        .easyfetch(tools.Api.GetBackupSchedule, this.data)
        .then(res => {
          this.data.schedule = res.data.info.cron;
          this.data.lastBackupTime = res.data.info.lastBackupTime;
          this.$Loading.finish();
        })
        .catch();
    }
  },
  mounted() {
    this.backupGtClicked();
  }
};
</script>