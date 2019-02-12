<template>
  <div>
  <table class="table">
  <tr v-for="(item,index) in msgs.list" :key="index">
    <th>{{item.authorNickName}}</th>
    <th>{{item.msg}}</th>
    <Badge v-if="item.hasRead===0" status="error" />
    <th>{{item.createTime}}</th>
  </tr>
  </table>
  <Page v-if="msgs.totalPage>1" :total="totalPage" :page-size="conp.pageRow" show-elevator @on-change="onPageChange"/>
  </div>
</template>
<script>
import fetch from '@/util/fetch.js'
export default {
  data () {
    return {
      msgs: {},
      totalPage: 0,
      conp: { pageRow: 10, pageNum: 0 ,receiver: this.$store.state.currentUser.id}
    }
  },
  methods: {
    getInfo () {
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/msg/list',
        data: JSON.stringify(this.conp)
      })
        .then(res => {
          this.msgs = res.data.info
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
  margin-left: auto;
  margin-right: auto;
}
</style>
