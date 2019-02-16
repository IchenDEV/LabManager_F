<template>
    <ui-button color="primary" icon="backup" @click="backupClicked" :loading="iswaitting">现在备份</ui-button>
</template>
<script>
import fetch from '@/util/fetch.js'
export default {
  data () {
    return {
      iswaitting: false
    }
  },
  methods: {
    backupClicked () {
      this.iswaitting = true
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/backup/now',
        data: JSON.stringify('{}')
      })
        .then(() => {
          this.iswaitting = false
        })
        .catch()
    }
  }
}
</script>
