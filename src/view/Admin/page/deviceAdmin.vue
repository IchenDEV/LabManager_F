<template>
  <div>
    <Card>
      <h2>修改设备信息</h2>
        <div class="flex-panel">
          <ui-textbox icon="person" floating-label label="编号" v-model="item.No"></ui-textbox>
    <ui-textbox icon="person" floating-label label="名称" v-model="item.name"></ui-textbox>
    <ui-textbox icon="lock"   floating-label label="描述" v-model="item.description"></ui-textbox>
    <ui-textbox icon="person" floating-label label="型号" v-model="item.model"></ui-textbox>
    <ui-textbox icon="person" floating-label label="品牌" v-model="item.band"></ui-textbox>
     <ui-select
      has-search
      label='实验室'
      type='image'
      :options='labInfo.list'
      :keys='{ label: "name", value: "id" }'
      v-model='lab'
    ></ui-select>
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
      iswaitting: false,
      labInfo: {},
      lab: ''
    }
  },
  methods: {
    getLabInfo () {
      let conp = { pageRow: 1000, offSet: 0 }
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/lab/list',
        data: JSON.stringify(conp)
      })
        .then(res => {
          this.labInfo = res.data.info
        })
        .catch()
    },
   getDeviceInfo () {
      for (var key in this.search) {
        if (this.search[key] === null || this.search[key] === '') {
          delete this.search[key]
        }
      }
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/device/list',
        data: JSON.stringify(this.search)
      })
        .then(res => {
          this.item = res.data.info.list[0]
        })
        .catch()
    },
   updateClick () {
      this.iswaitting = true
      this.item.location = this.lab.id
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/device/updateDevice',
        data: JSON.stringify(this.item)
      })
      .then(this.iswaitting = false)
      .catch()
    }
  },
  mounted () {
    this.getLabInfo()
    this.getDeviceInfo()
  }
}
</script>
