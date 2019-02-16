<template>
  <div>
    <ui-textbox icon="time" floating-label label="备份时间cron表达式" v-model="data.schedule"></ui-textbox>
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
        schedule: ''
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
        url: this.$store.state.host + "/backup/getSchedule",
      })
        .then(res => {
          this.data.schedule= res.data.info.cron;
          this.iswaitting = false;
        })
        .catch();
    }
  },
  mounted () {
      this.backupGtClicked()
  }
};
</script>