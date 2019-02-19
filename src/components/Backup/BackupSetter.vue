<template>
  <div>
    <h2>上次备份时间</h2>
    <p v-if="data.lastBackupTime == null">无备份</p>
    <Time v-else :time="data.lastBackupTime" :interval="1"/>
    <h2>设定备份周期</h2>
    <ui-textbox icon="access_time" floating-label label="备份时间cron表达式" v-model="data.schedule"></ui-textbox>
    <ui-button color="primary" icon="backup" @click="backupClicked" :loading="iswaitting">设定</ui-button>
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