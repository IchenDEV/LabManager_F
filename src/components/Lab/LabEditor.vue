<template>
  <div>
    <Card :bordered="false">
      <h2>{{ $t('message.modify') }} {{ $t('message.lab') }}</h2>
      <div class="flex-panel">
        <ui-textbox
          v-model="item.name"
          icon="phone"
          floating-label
          :label="$t('message.name')"
        />
        <ui-textbox
          v-model="item.description"
          icon="phone"
          floating-label
          :label="$t('message.description')"
        />
        <ui-textbox
          v-model="item.location"
          icon="not_listed_location"
          floating-label
          :label="$t('message.location')"
        />
      </div>
      <ui-button
        color="primary"
        icon="update"
        :loading="iswaitting"
        @click="updateClick"
      >
        {{ $t('message.update') }}
      </ui-button>
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
  mounted () {
    this.getLabInfo()
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
      .then(()=>{this.iswaitting = false;this.getLabInfo()})
      .catch()
    }
  }
}
</script>