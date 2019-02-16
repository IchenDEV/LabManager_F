<template>
    <ui-select
      has-search
      :label='label'
      :options='projectInfo.list'
      :keys='{ label: "name", value: "id" }'
      v-model='select'
      @select="vs"
    ></ui-select>
</template>
<script>
import fetch from '@/util/fetch.js'
export default {
  props: { label: { default: '项目' }, selected:Object,isWorking:{ default: false }},
  model: {
    prop: 'selected',
    event: 'change'
  },
  data () {
    return {
      search:{},
      projectInfo: { list: [] },
      iswaitting: false,
      select: {}
    }
  },
  methods: {
    getProjectInfo () {
      if(this.isWorking){
        this.search.status = 1
      }
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/project/list',
        data: JSON.stringify(this.search)
      })
        .then(res => {
          this.projectInfo = res.data.info
        })
        .catch()
    },
    /* eslint-disable */
    vs (){
        this.$emit('change', this.select)
        console.log(this.select)
    }
  },
  mounted () {
    if (this.$store.state.hasSingin === true) {
        this.getProjectInfo()
    }
  }
}
</script>