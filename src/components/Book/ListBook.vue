<template>
  <div>
    <h2>预定列表</h2>
    <!-- <div class="flex-panel">
      <ui-textbox icon="person" floating-label label="名称" v-model="search.name"></ui-textbox>
      <ui-textbox icon="person" floating-label label="id" v-model="search.id"></ui-textbox>
    </div>
    <ui-button color="primary" icon="search" @click="searchClicked">搜索</ui-button> -->
    <div class="flex-panel">
      <Card v-for="(item,index) in books.list" :key="index">
        <p slot="title">{{item.applicantNickname}}</p>
        <p>{{item.id}}</p>
        <p>{{item.projectName}}</p>
        <p>{{item.deviceName}}</p>
        <p>{{item.beginTime}} ~ {{item.endTime}}</p>
        <p>{{item.createTime}}</p>
        <span>
          <ui-button
            color="primary"
            icon="delete"
            @click="delClicked(item.id,index)"
            :loading="iswaitting"
          >删除</ui-button>
        </span>
      </Card>
      <Card v-if="books.totalCount===0">
        <div>
         没有找到相关部门
        </div>
      </Card>
    </div>
    <Page
      v-if="books.totalPage>1"
      :total="books.totalPage"
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
      books: {},
      search: { pageRow: 10 },
      iswaitting: false
    };
  },
  methods: {
    getInfo() {
      fetch({
        method: "Post",
        url: this.$store.state.host + "/book/list",
        data: JSON.stringify(this.search)
      })
        .then(res => {
          this.books = res.data.info;
        })
        .catch();
    },
    onPageChange(page) {
      this.search.pageNum = page;
      this.getInfo();
    },
    delClicked(id,index) {
      let da = { id: id };
      this.books.list.splice(index, 1)
      fetch({
        method: "Post",
        url: this.$store.state.host + "/book/deleteBook",
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
