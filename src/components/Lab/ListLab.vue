<template>
<div>
  <h2>实验室列表</h2>
  <div class="flex-panel">
      <ui-textbox icon="person" floating-label label="名称" v-model="search.name"></ui-textbox>
      <ui-textbox icon="code" floating-label label="id" v-model="search.id"></ui-textbox>
      <ui-textbox icon="location_on" floating-label label="地点" v-model="search.location"></ui-textbox>
    </div>
    <ui-button color="primary" icon="search" @click="searchClicked">搜索</ui-button>
  <div class="flex-panel">
    <Card v-for="(item,index) in labs.list" :key="index">
      <p slot="title">{{item.name}}</p>
      <p>id: {{item.id}}</p>
      <p>地点 {{item.location}}</p>
      <p>描述 {{item.description}}</p>
      <p>创建时间 {{item.createTime}}</p>
      <span>
      <ui-button color="primary" icon="delete" @click="moClicked(item.id)" :loading="iswaitting">修改</ui-button>
      <ui-button color="primary" icon="delete" @click="delClicked(item.id,index)" :loading="iswaitting">删除</ui-button>
      </span>
    </Card>
    <Card v-if="labs.totalCount===0">
        <div>
         没有找到相关实验室
        </div>
      </Card>
  </div>
  <Page v-if="labs.totalPage>1" :total="labs.totalPage" :page-size="search.pageRow" show-elevator @on-change="onPageChange"/>
</div>
</template>
<script>
import router from '@/router'
import fetch from '@/util/fetch.js'
export default {
  data () {
    return {
      labs: {},
      search: { pageRow: 10 },
      iswaitting: false
    }
  },
  methods: {
    getInfo () {
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/lab/list',
        data: JSON.stringify(this.search)
      })
        .then(res => {
          this.labs = res.data.info
        })
        .catch()
    },
    onPageChange (page) {
      this.search.pageNum = page
      this.getInfo()
    },
    delClicked (id,index) {
      this.labs.list.splice(index, 1)
      let da = {id: id}
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/lab/deleteLab',
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
    },
    moClicked (id){
      router.push("lab/"+id.toString())
    }
  },
  mounted () {
    this.getInfo()
  }
}
</script>
