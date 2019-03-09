<template>
  <div>
    <h2>{{ $t('message.lastBackupTime') }}</h2>
    <p v-if="data.lastBackupTime == null">
      {{ $t('message.noBackup') }}
    </p>
    <Time
      v-else
      :time="data.lastBackupTime"
      :interval="1"
    />
    <h2>{{ $t('message.setBackupSchedule') }}</h2>
    <ui-textbox
      v-model="data.schedule"
      icon="access_time"
      floating-label
      label="cron"
    />
    <ui-button
      color="primary"
      icon="backup"
      :loading="iswaitting"
      @click="backupClicked"
    >
      {{ $t('message.set') }}
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
        lastBackupTime:new Date()
      }
    };
  },
  mounted() {
    this.backupGtClicked();
  },
  methods: {
    backupClicked() {
      this.iswaitting = true;
      tools.easyfetch(tools.Api.SetBackupSchedule,this.data)
      this.iswaitting = false;
    },
    backupGtClicked() {
      this.iswaitting = true;
      tools.easyfetch(tools.Api.GetBackupSchedule,this.data)
      .then(res => {
          this.data.schedule = res.data.info.cron
          this.data.lastBackupTime=res.data.info.lastBackupTime
          this.iswaitting = false;
        })
        .catch();
    }
  }
};
</script>