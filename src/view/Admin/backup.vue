<template>
<div>
  <div class="flex-panel col-panel">
    <backup-now></backup-now>
    <backup-setter></backup-setter>
  </div>
</div>
</template>
<script>
import BackupNow from '@/components/Backup/BackupNow'
import BackupSetter from '@/components/Backup/BackupSetter'
export default {
  components: { BackupNow,BackupSetter },
}
</script>
<style>
.col-panel {
    background-color: white;
    display: flex;
    flex-direction: column;
    z-index: 1;
}
</style>

