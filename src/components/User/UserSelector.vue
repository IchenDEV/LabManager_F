<template>
    <ui-select
      has-search
      :label='label'
      :options='userInfo.list'
      :keys='{ label: "nickname", value: "id" }'
      v-model='select'
      @select="vs"
    ></ui-select>
</template>
<script>
import fetch from '@/util/fetch.js'
export default {
  props: { label: { default: '' }, selected:{ default: null }},
  model: {
    prop: 'selected',
    event: 'change'
  },
  data () {
    return {
      userInfo: { list: [] },
      iswaitting: false,
      select: ''
    }
  },
  methods: {
    getUserInfo () {
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/user/list',
        data: '{}'
      })
        .then(res => {
          this.userInfo = res.data.info
        })
        .catch()
    },
    /* eslint-disable */
    vs (){
        //this.selected = this.select  
        this.$emit('change', this.select)
    }
  },
  mounted () {
    if (this.$store.state.hasSingin === true) {
        this.getUserInfo()
    }
  }
}
</script>
