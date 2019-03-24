<template>
  <div>
    <Card class="ms-depth-16"   >
      <h2>{{$t('message.modify')}} {{$t('message.lab')}}</h2>
        <div class="flex-panel">
          <ui-textbox icon='phone' floating-label :label="$t('message.name')" v-model='item.name'></ui-textbox>
          <ui-textbox icon='phone' floating-label :label="$t('message.description')" v-model='item.description'></ui-textbox>
          <ui-textbox icon='not_listed_location' floating-label :label="$t('message.location')" v-model='item.location'></ui-textbox>
        </div>
        <ui-button color="primary" icon="update" @click="updateClick" :loading="iswaitting">{{$t('message.update')}}</ui-button>
    </Card>
  </div>
</template>
<script>
import tools from '@/util/tools.js'
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
      tools.easyfetch(tools.Api.ListLab,this.search)
      .then(res => {
          this.item = res.data.info.list[0]
        })
        .catch()
    },
   updateClick () {
      this.iswaitting = true
      tools.easyfetch(tools.Api.UpdateLab,this.item)
      .then(()=>{this.$Loading.finish();this.getLabInfo()})
      .catch()
    }
  },
  mounted () {
    this.getLabInfo()
  }
}
</script>