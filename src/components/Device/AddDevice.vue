<template>
  <div class="add-group">
    <h2>{{ $t('message.create') }} {{ $t('message.device') }}</h2>
    <div class="flex-panel">
      <ui-textbox
        v-model="con.No"
        icon="person"
        floating-label
        :label="$t('message.No')"
      />
      <ui-textbox
        v-model="con.name"
        icon="person"
        floating-label
        :label="$t('message.name')"
      />
      <ui-textbox
        v-model="con.func"
        icon="person"
        floating-label
        :label="$t('message.func')"
      />
      <ui-textbox
        v-model="con.requireReputation"
        icon="person"
        floating-label
        :label="$t('message.requireReputation')"
      />
      <ui-select
        v-model="search.device"
        has-search
        :label="$t('message.lab')"
        :options="labInfo.list"
        :keys="{ label: &quot;name&quot;, value: &quot;id&quot; }"
      />
      <ui-textbox
        v-model="con.description"
        icon="lock"
        floating-label
        :label="$t('message.description')"
      />
      <ui-textbox
        v-model="con.model"
        icon="person"
        floating-label
        :label="$t('message.model')"
      />
      <ui-textbox
        v-model="con.band"
        icon="person"
        floating-label
        :label="$t('message.band')"
      />
    </div>
    <ui-button
      :disabled="disable"
      color="primary"
      icon="check"
      :loading="iswaitting"
      @click="addClicked"
      @touch="getLabInfo"
    >
      {{ $t('message.create') }}
    </ui-button>
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
  mounted () {
    this.getLabInfo()
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
  }
}
</script>
<style>
</style>
