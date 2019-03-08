<template>
  <div>
    <Card :bordered="false" >
    <h1>{{$t('message.log')}}</h1>
    
  <table class="table">
  <tr >
    <th>{{$t('message.operator')}}</th>
    <th>{{$t('message.operation')}}</th>
    <th>{{$t('message.targer')}}</th>
    <th>{{$t('message.time')}}</th>
  </tr>
  <tr v-for="(item,index) in logs.list" :key="index">
    <th>{{item.user}}</th>
    <th>{{item.operation}}</th>
    <th>{{item.targer}}</th>
    <th>{{item.createTime}}</th>
  </tr>
  </table>
  <Page size="small" v-if="logs.totalPage>1" :total="totalPage" :page-size="conp.pageRow" show-elevator @on-change="onPageChange"/>
    </Card>
  </div>
</template>
<script>
import tools from '@/util/tools.js'
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
      tools.easyfetch(tools.Api.ListLog,this.conp)
        .then(res => {
          this.logs = res.data.info
          this.totalPage = res.data.info.totalCount
        })
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
