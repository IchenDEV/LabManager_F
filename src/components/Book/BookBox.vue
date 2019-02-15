<template>
  <div>
  <table class="table">
  <tr v-for="(item,index) in books.list" :key="index">
    <th>
    <a @click="devicecli(item.id,index)">{{item.deviceName}}</a>
    </th>
    <th>
    <a @click="projectcli(item.id,index)">{{item.projectName}}</a>
    </th>
    <th>
    <Badge v-if="item.hasRead===0" status="error" />
    </th>
    <th>{{item.createTime}}</th>
  </tr>
  </table>
  <Page size="small" v-if="books.totalPage>1" :total="totalPage" :page-size="conp.pageRow" show-elevator @on-change="onPageChange"/>
  <ui-fab
    icon="refresh"
    class="fab"
    tooltip-position="right"
    @click="getInfo"
    tooltip="刷新"
  ></ui-fab>
    <ui-modal ref="devicemodal" :title="selectBook.deviceName">
        <p>{{selectBook.device}}</p>
        <p>{{selectBook.deviceName}}</p>
        <p>{{selectBook.deviceNo}}</p>
        <p>{{selectBook.deviceModel}}</p>
        <p>{{selectBook.deviceBand}}</p>
        <p>{{selectBook.deviceDescription}}</p>
    </ui-modal>
    <ui-modal ref="projectmodal" :title="selectBook.projectName">
        <p>{{selectBook.project}}</p>
        <p>{{selectBook.projectName}}</p>
        <p>{{selectBook.projectDescription}}</p>
    </ui-modal>
  </div>
</template>
<script>
import fetch from '@/util/fetch.js'
export default {
  data () {
    return {
      books: {},
      selectBook: {},
      totalPage: 0,
      conp: { pageRow: 10, pageNum: 0 ,applicant: this.$store.state.currentUser.id}
    }
  },
  methods: {
    getInfo () {
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/book/list',
        data: JSON.stringify(this.conp)
      })
        .then(res => {
          this.books = res.data.info
          this.totalPage = res.data.info.totalCount
        })
        .catch()
    },
    onPageChange (page) {
      this.conp.pageNum = page
      this.getInfo()
    },
    projectcli (id,index) {
      this.selectBook = this.books.list[index]
      this.$refs['projectmodal'].open()
    },
    devicecli (id,index) {
      this.selectBook = this.books.list[index]
      this.$refs['devicemodal'].open()
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
