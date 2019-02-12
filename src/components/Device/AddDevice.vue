<template>
  <div class="add-group">
    <ui-textbox icon="person" floating-label label="编号" v-model="con.No"></ui-textbox>
    <ui-textbox icon="person" floating-label label="名称" v-model="con.name"></ui-textbox>
     <ui-select
      has-search
      label='实验室'
      type='image'
      :options='labInfo.list'
      :keys='{ label: "name", value: "id" }'
      v-model='search.device'
    ></ui-select>
    <ui-textbox icon="lock"   floating-label label="描述" v-model="con.description"></ui-textbox>
    <ui-textbox icon="person" floating-label label="型号" v-model="con.model"></ui-textbox>
    <ui-textbox icon="person" floating-label label="品牌" v-model="con.band"></ui-textbox>
    <ui-button color="primary" icon="check" @click="addClicked" :loading="iswaitting" @touch="getLabInfo">新建</ui-button>
  </div>
</template>
<script>
import fetch from '@/util/fetch.js'
export default {
  data () {
    return {
      con: {
        No: '',
        name: '',
        description: '',
        model: '',
        band: '',
        location: '',
        status: 1
      },
      labInfo: { list: [] },
      info: {},
      search: {
        model: '',
        band: '',
        name: '',
        No: '',
        device: 1,
        pageRow: 1000,
        offSet: 0
      },
      iswaitting: false
    }
  },
  methods: {
    addClicked () {
      this.con.location = this.search.device.id
      this.iswaitting = true
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/device/addDevice',
        data: JSON.stringify(this.con)
      })
        .then(()=> {
          this.iswaitting = false
        })
        .catch()
    },
    getLabInfo () {
      let conp = { pageRow: 100, offSet: 0 }
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/lab/list',
        data: JSON.stringify(conp)
      })
        .then(res => {
          this.labInfo = res.data.info
        })
        .catch()
    }
  },
  mounted () {
    this.getLabInfo()
  }
}
</script>
<style>
</style>
