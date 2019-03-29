<template>
  <div>
    <Card class="ms-depth-16"  >
      <h1>{{ $t('message.backup') }}</h1>
      <div class="col-panel center">
        <backup-now />
        <backup-setter />
      </div>
    </Card>
  </div>
</template>
<script>
import backupNow from "@/components/backup/backupNow";
import backupSetter from "@/components/backup/backupSetter";
export default {
  components: { backupNow, backupSetter }
};
</script>

