<template>
    <ui-select
      has-search
      :label='label'
      :options='projectInfo.list'
      :keys='keys'
      v-model='select'
      @select="vs"
    ></ui-select>
</template>
<script>
import fetch from '@/util/fetch.js'
export default {
  props: { label: { default: '' }, selected:{ default: null },isWorking:{ default: false },user:{default: null}},
  model: {
    prop: 'selected',
    event: 'change'
  },
  data () {
    return {
      search:{},
      projectInfo: { list: [] },
      iswaitting: false,
      select: '',
      keys:{ label: "name", value: "id" }
    }
  },
  methods: {
    getProjectInfo () {
      let fetchPath='/project/list';
      if(this.isWorking){
        this.search.status = 1
      }
      if(this.user!=null){
        this.search.id=this.user
        fetchPath='/user/listProject'
        this.keys.label="projectName"
      }
      fetch({
        method: 'Post',
        url: this.$store.state.host +fetchPath ,
        data: JSON.stringify(this.search)
      })
        .then(res => {
          this.projectInfo = res.data.info
        })
        .catch()
    },
    vs (){
        this.$emit('change', this.select)
    }
  },
  mounted () {
    if (this.$store.state.hasSingin === true) {
        this.getProjectInfo()
    }
  }
}
</script>