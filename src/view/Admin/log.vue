<template>
  <div>
  <table class="table">
  <tr v-for="(item,index) in logs.list" :key="index">
    <th>{{item.user}}</th>
    <th>{{item.operation}}</th>
    <th>{{item.targer}}</th>
    <th>{{item.createTime}}</th>
  </tr>
  </table>
  <Page v-if="logs.totalPage>1" :total="totalPage" :page-size="conp.pageRow" show-elevator @on-change="onPageChange"/>
  </div>
</template>
<script>
import fetch from '@/util/fetch.js'
export default {
  data () {
    return {
      logs: {},
      totalPage: 0,
      conp: { pageRow: 25, pageNum: 0 }
    }
  },
  methods: {
    getInfo () {
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/log/list',
        data: JSON.stringify(this.conp)
      })
        .then(res => {
          this.logs = res.data.info
          this.totalPage = res.data.info.totalCount
        })
        .catch()
    },
    onPageChange (page) {
      this.conp.pageNum = page
      this.getInfo()
    }
  },
  mounted () {
    this.getInfo()
  }
}
</script>
<style>
.table{
  text-align: center;
}
</style>
