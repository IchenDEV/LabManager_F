<template>
<div>
  <div class="flex-panel">
      <ui-textbox icon="person" floating-label label="name" v-model="search.name"></ui-textbox>
      <ui-textbox icon="person" floating-label label="id" v-model="search.id"></ui-textbox>
    </div>
    <ui-button color="primary" icon="search" @click="searchClicked">??</ui-button>
  <div class="flex-panel">
    <Card v-for="(item,index) in projects.list" :key="index">
      <p slot="title">{{item.name}}</p>
      <p>{{item.id}}</p>
      <p>{{item.description}}</p>
      <p>{{item.createTime}}</p>
      <p>{{item.beginTime}}</p>
      <p>{{item.cendTime}}</p>
      <span>
      <ui-button color="primary" icon="delete" @click="moClicked(item.id)" :loading="iswaitting">修改</ui-button>
      <ui-button color="primary" icon="delete" @click="delClicked(item.id)" :loading="iswaitting">删除</ui-button>
      </span>
    </Card>
  </div>
  <Page v-if="projects.totalPage>1" :total="projects.totalPage" :page-size="search.pageRow" show-elevator @on-change="onPageChange"/>
</div>
</template>
<script>
import fetch from '@/util/fetch.js'
export default {
  data () {
    return {
      projects: {},
      search: { pageRow: 10 },
      iswaitting: false
    }
  },
  methods: {
    getInfo () {
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/project/list',
        data: JSON.stringify(this.search)
      })
        .then(res => {
          this.projects = res.data.info
        })
        .catch()
    },
    onPageChange (page) {
      this.search.pageNum = page
      this.getInfo()
    },
    delClicked (id) {
      let da = {id: id}
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/project/deleteProject',
        data: JSON.stringify(da)
      })
        .then()
        .catch()
    },
    searchClicked() {
      for (var key in this.search) {
        if (this.search[key] === null || this.search[key] === "") {
          delete this.search[key];
        }
      }
      this.getInfo();
    }
  },
  mounted () {
    this.getInfo()
  }
}
</script>