<template>
  <div>
    <h2>{{$t('message.lastBackupTime')}}</h2>
    <p v-if="data.lastBackupTime == null">{{$t('message.noBackup')}}</p>
    <Time v-else :time="data.lastBackupTime" :interval="1"/>
    <h2>{{$t('message.setBackupSchedule')}}</h2>
    <ui-textbox icon="access_time" floating-label label="cron" v-model="data.schedule"></ui-textbox>
    <ui-button color="primary" icon="backup" @click="backupClicked" :loading="iswaitting">{{$t('message.set')}}</ui-button>
  </div>
</template>
<script>
import fetch from "@/util/fetch.js";
export default {
  data() {
    return {
      iswaitting: false,
      data: {
        schedule: "",
        lastBackupTime:new Date()
      }
    };
  },
  methods: {
    backupClicked() {
      this.iswaitting = true;
      fetch({
        method: "Post",
        url: this.$store.state.host + "/backup/setSchedule",
        data: JSON.stringify(this.data)
      })
        .then(() => {
          this.iswaitting = false;
        })
        .catch();
    },
    backupGtClicked() {
      this.iswaitting = true;
      fetch({
        method: "Post",
        url: this.$store.state.host + "/backup/getSchedule"
      })
        .then(res => {
          this.data.schedule = res.data.info.cron
          this.data.lastBackupTime=res.data.info.lastBackupTime
          this.iswaitting = false;
        })
        .catch();
    }
  },
  mounted() {
    this.backupGtClicked();
  }
};
</script>