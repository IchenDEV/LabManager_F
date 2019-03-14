<template>
  <div class="add-group">
    <h2>{{$t('message.create')}} {{$t('message.device')}}</h2>
    <div class="flex-panel">
      <!--将管理页面的新加设备的图标修改全部改为info_outline，描述改为description，品牌改为devices-->
    <ui-textbox icon="info_outline" floating-label :label="$t('message.No')" v-model="con.No"></ui-textbox>
    <ui-textbox icon="info_outline" floating-label :label="$t('message.name')" v-model="con.name"></ui-textbox>
    <ui-textbox icon="info_outline" floating-label :label="$t('message.func')" v-model="con.func"></ui-textbox>
    <ui-textbox icon="info_outline" floating-label :label="$t('message.requireReputation')" v-model="con.requireReputation"></ui-textbox>
     <ui-select
      has-search
      :label="$t('message.lab')"
      :options='labInfo.list'
      :keys='{ label: "name", value: "id" }'
      v-model='search.device'
    ></ui-select>
    <ui-textbox icon="description"   floating-label :label="$t('message.description')" v-model="con.description"></ui-textbox>
    <ui-textbox icon="info_outline" floating-label :label="$t('message.model')" v-model="con.model"></ui-textbox>
    <ui-textbox icon="devices" floating-label :label="$t('message.band')" v-model="con.band"></ui-textbox>
    </div>
    <ui-button :disabled="disable" color="primary" icon="check" @click="addClicked" :loading="iswaitting" @touch="getLabInfo">{{$t('message.create')}}</ui-button>
  </div>
</template>
<script>
import tools from '@/util/tools.js'
export default {
  data () {
    return {
      con: {
        No: '',
        name: '',
        description: '',
        requireReputation:'',
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
  computed :{
    disable () {
      return this.con.No==''||this.con.name==''||this.con.band==''||this.con.model==''||this.con.description==''||this.search.device==null||this.search.device==1
    }
  },
  methods: {
    addClicked () {
      this.con.location = this.search.device.id
      this.iswaitting = true
      tools.easyfetch(tools.Api.AddDevice,this.con).then(()=>{
        this.iswaitting = false
        this.$emit('added')
      })
      
    },
    getLabInfo () {
      let conp = { pageRow: 1000, offSet: 0 }
      tools.easyfetch(tools.Api.ListLab,conp)
        .then(res => {
          this.labInfo = res.data.info
        })
    }
  },
  mounted () {
    this.getLabInfo()
  }
}
</script>
<style>
</style>
