<template>
  <div>
  <table class="table">
  <tr v-for="(item,index) in msgs.list" :key="index">
    <th>{{item.authorNickName}}</th>
    <a @click="msgcli(item.id,index)">{{item.msg}}</a>
    <th>
    <Badge v-if="item.hasRead===0" status="error" />
    </th>
    <th>{{item.createTime}}</th>
  </tr>
  </table>
  <Page size="small" v-if="msgs.totalPage>1" :total="totalPage" :page-size="conp.pageRow" show-elevator @on-change="onPageChange"/>
  <ui-fab
    icon="refresh"
    class="fab"
    tooltip-position="right"
    @click="getInfo"
  ></ui-fab>
    <ui-modal ref="msgmodal" :title="selectMsg.authorNickName">
        {{selectMsg.msg}}
    </ui-modal>
  </div>
</template>
<script>
import fetch from '@/util/fetch.js'
export default {
  data () {
    return {
      msgs: {},
      selectMsg: {},
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
    readMsg (id) {
      let cp={id: id}
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/msg/readMsg',
        data: JSON.stringify(cp)
      })
        .then()
        .catch()
    },
    onPageChange (page) {
      this.conp.pageNum = page
      this.getInfo()
    },
    msgcli (id,index) {
      this.msgs.list[index].hasRead = true
      this.selectMsg = this.msgs.list[index]
      this.$refs['msgmodal'].open()
      this.readMsg (id)
    }
  },
  mounted () {
    if (this.$store.state.hasSingin === true) {
      this.getInfo()
    }
  }
}
</script>
<style>
.table{
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
.fab{
  position: absolute;
  right: 10px;
  bottom: 0px;
}
</style>
