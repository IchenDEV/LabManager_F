<template>
  <div>
    <Card>
      <h2>修改实验室信息</h2>
        <div class="flex-panel">
          <ui-textbox icon='phone' floating-label label='名称' v-model='item.name'></ui-textbox>
          <ui-textbox icon='phone' floating-label label='描述' v-model='item.description'></ui-textbox>
          <ui-textbox icon='phone' floating-label label='地点' v-model='item.location'></ui-textbox>
        </div>
        <ui-button color="primary" icon="update" @click="updateClick" :loading="iswaitting">更新</ui-button>
    </Card>
  </div>
</template>
<script>
import fetch from '@/util/fetch.js'
export default {
  data () {
    return {
      search: { id: this.$route.params.id, pageRow: 1},
      item: {},
      iswaitting: false
    }
  },
  methods: {
    getLabInfo () {
      for (var key in this.search) {
        if (this.search[key] === null || this.search[key] === '') {
          delete this.search[key]
        }
      }
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/lab/list',
        data: JSON.stringify(this.search)
      })
        .then(res => {
          this.item = res.data.info.list[0]
        })
        .catch()
    },
   updateClick () {
      this.iswaitting = true
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/lab/updateLab',
        data: JSON.stringify(this.item)
      })
      .then(this.iswaitting = false)
      .catch()
    }
  },
  mounted () {
    this.getLabInfo()
  }
}
</script>
