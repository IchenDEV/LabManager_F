<template>
  <div>
    <h2>项目列表</h2>
    <div class="flex-panel">
      <ui-textbox icon="person" floating-label label="名称" v-model="search.name"></ui-textbox>
      <ui-textbox icon="code" floating-label label="id" v-model="search.id"></ui-textbox>
    </div>
    <ui-button color="primary" icon="search" @click="searchClicked">搜索</ui-button>
    <div class="flex-panel">
      <Card v-for="(item,index) in projects.list" :key="index">
        <p slot="title">
          {{item.name}}
          <Tag color="success" v-if="item.status===1">进行中</Tag>
          <Tag color="error" v-if="item.status===0">完成</Tag>
          <Tag color="warning" v-if="item.status===3">暂停</Tag>
        </p>
        <p>id：{{item.id}}</p>
        <p>描述{{item.description}}</p>
        <p>创建时间{{item.createTime}}</p>
        <p>开始时间{{item.beginTime}}</p>
        <p>结束时间{{item.endTime}}</p>
        <span>
          <ui-button
            color="primary"
            icon="adjust"
            @click="moClicked(item.id)"
            :loading="iswaitting"
          >修改</ui-button>
          <ui-button
            color="primary"
            icon="delete"
            @click="delClicked(item.id,index)"
            :loading="iswaitting"
          >删除</ui-button>
        </span>
      </Card>
      <Card v-if="projects.totalCount===0">
        <div>没有找到相关项目</div>
      </Card>
    </div>
    <Page
      size="small"
      v-if="projects.totalPage>1"
      :total="projects.totalPage"
      :page-size="search.pageRow"
      show-elevator
      @on-change="onPageChange"
    />
  </div>
</template>
<script>
import fetch from "@/util/fetch.js";
export default {
  data() {
    return {
      projects: {},
      search: { pageRow: 10 },
      iswaitting: false
    };
  },
  methods: {
    getInfo() {
      fetch({
        method: "Post",
        url: this.$store.state.host + "/project/list",
        data: JSON.stringify(this.search)
      })
        .then(res => {
          this.projects = res.data.info;
        })
        .catch();
    },
    onPageChange(page) {
      this.search.pageNum = page;
      this.getInfo();
    },
    delClicked(id, index) {
      this.projects.list.splice(index, 1);
      let da = { id: id };
      fetch({
        method: "Post",
        url: this.$store.state.host + "/project/deleteProject",
        data: JSON.stringify(da)
      })
        .then()
        .catch();
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
  mounted() {
    this.getInfo();
  }
};
</script>