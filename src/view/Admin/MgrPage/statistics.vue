<template>
<div>
  <h1>{{$t('message.statistics')}}</h1>
  <div class="flex-panel col-panel">
    <backup-now></backup-now>
    <backup-setter></backup-setter>
  </div>
</div>
</template>
<script>
import BackupNow from '@/components/statistics/counts'
import BackupSetter from '@/components/statistics/rate'
export default {
  components: { BackupNow,BackupSetter },
}
</script>