<template>
<div>
  <div class="flex-panel">
    <Card v-for="(item,index) in groups.list" :key="index">
      <p slot="title">{{item.name}}</p>
      <p>{{item.id}}</p>
      <p>{{item.description}}</p>
      <p>{{item.createTime}}</p>
      <span>
      <ui-button color="primary" icon="delete" @click="moClicked(item.id)" :loading="iswaitting">修改</ui-button>
      <ui-button color="primary" icon="delete" @click="delClicked(item.id)" :loading="iswaitting">删除</ui-button>
      </span>
    </Card>
  </div>
  <Page v-if="groups.totalPage>1" :total="groups.totalPage" :page-size="conp.pageRow" show-elevator @on-change="onPageChange"/>
</div>
</template>
<script>
import fetch from '@/util/fetch.js'
export default {
  data () {
    return {
      groups: {},
      conp: { pageRow: 10 },
      iswaitting: false
    }
  },
  methods: {
    getInfo () {
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/group/list',
        data: JSON.stringify(this.conp)
      })
        .then(res => {
          this.groups = res.data.info
        })
        .catch()
    },
    onPageChange (page) {
      this.conp.pageNum = page
      this.getInfo()
    },
    delClicked (id) {
      let da = {id: id}
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/group/deleteGroup',
        data: JSON.stringify(da)
      })
        .then()
        .catch()
    }
  },
  mounted () {
    this.getInfo()
  }
}
</script>
