<template>
  <ui-select
    v-model="select"
    has-search
    :label="label"
    :options="userInfo.list"
    :keys="{ label: &quot;nickname&quot;, value: &quot;id&quot; }"
    @select="vs"
  />
</template>
<script>
import tools from '@/util/tools.js'
export default {
  model: {
    prop: 'selected',
    event: 'change'
  },
  props: { label: { default: '' }, selected:{ default: null }},
  data () {
    return {
      userInfo: { list: [] },
      iswaitting: false,
      select: ''
    }
  },
  mounted () {
    if (this.$store.state.hasSingin === true) {
        this.getUserInfo()
    }
  },
  methods: {
    getUserInfo () {
      tools.easyfetch(tools.Api.ListUser,null)
        .then(res => {
          this.userInfo = res.data.info
        })
    },
    vs (){
        this.$emit('change', this.select)
    }
  }
}
</script>
