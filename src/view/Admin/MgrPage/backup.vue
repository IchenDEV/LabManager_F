<template>
  <div>
    <Card :bordered="false" >
    <h1>{{$t('message.backup')}}</h1>
      <div class="flex-panel col-panel">
        <backup-now></backup-now>
        <backup-setter></backup-setter>
      </div>
    </Card>
  </div>
</template>
<script>
import BackupNow from "@/components/Backup/BackupNow";
import BackupSetter from "@/components/Backup/BackupSetter";
export default {
  components: { BackupNow, BackupSetter }
};
</script>

