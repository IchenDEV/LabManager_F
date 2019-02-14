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
  props: { label: { default: '项目' }, selected:Object},
  model: {
    prop: 'selected',
    event: 'change'
  },
  data () {
    return {
      projectInfo: { list: [] },
      iswaitting: false,
      select: {}
    }
  },
  methods: {
    getProjectInfo () {
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/project/list',
        data: '{}'
      })
        .then(res => {
          this.projectInfo = res.data.info
        })
        .catch()
    },
    /* eslint-disable */
    vs (){
        //this.selected = this.select  
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