<template>
    <ui-button color="primary" icon="backup" @click="backupClicked" :loading="iswaitting">{{$t('message.backup')}}</ui-button>
</template>
<script>
import tools from '@/util/tools.js'
export default {
  data () {
    return {
      iswaitting: false
    }
  },
  methods: {
    backupClicked () {
      this.iswaitting = true
      tools.easyfetch(tools.Api.BackupNow,null)
        .then(() => {
          this.iswaitting = false
        })
    }
  }
}
</script>
