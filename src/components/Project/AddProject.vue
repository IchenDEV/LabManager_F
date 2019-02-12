<template>
  <div class="add-project">
    <ui-textbox icon="person" floating-label label="名称" v-model="con.name"></ui-textbox>
    <ui-textbox icon="lock" floating-label label="描述" v-model="con.description"></ui-textbox>
    <ui-datepicker
                icon="events"
                floating-label
                v-model="con.beginTime"
            >beginTime</ui-datepicker>
    <ui-datepicker
                icon="events"
                floating-label
                v-model="con.endTime"
            >endTime</ui-datepicker>
    <ui-button color="primary" icon="check" @click="addClicked" :loading="iswaitting">新建</ui-button>
  </div>
</template>
<script>
import fetch from '@/util/fetch.js'
export default {
  data () {
    return {
      con: {
        name: '',
        description: '',
        beginTime: null,
        endTime: null,
        status: 1
      },
      iswaitting: false
    }
  },
  methods: {
    addClicked () {
      this.iswaitting = true
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/project/addProject',
        data: JSON.stringify(this.con)
      })
        .then(() => {
          this.iswaitting = false
        })
        .catch()
    }
  }
}
</script>