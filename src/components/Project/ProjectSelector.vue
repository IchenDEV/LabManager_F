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
  props: { label: { default: '' }, selected:Object,isWorking:{ default: false },user:{default: null}},
  model: {
    prop: 'selected',
    event: 'change'
  },
  data () {
    return {
      search:{},
      projectInfo: { list: [] },
      iswaitting: false,
      select: null
    }
  },
  methods: {
    getProjectInfo () {
      var fetchPath='/project/list';
      if(this.isWorking){
        this.search.status = 1
      }
      if(this.user!=null){
        this.search.id=this.user
        fetchPath='/user/listUserProject'
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