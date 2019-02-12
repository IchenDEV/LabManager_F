<template>
  <div>
    <div class="flex-panel">
      <ui-textbox icon="person" floating-label label="name" v-model="search.name"></ui-textbox>
      <ui-textbox icon="person" floating-label label="id" v-model="search.id"></ui-textbox>
    </div>
    <ui-button color="primary" icon="search" @click="searchClicked">搜索</ui-button>
    <div class="flex-panel">
      <Card v-for="(item,index) in departments.list" :key="index">
        <p slot="title">{{item.name}}</p>
        <p>{{item.id}}</p>
        <p>{{item.description}}</p>
        <p>{{item.createTime}}</p>
        <span>
          <ui-button
            color="primary"
            icon="delete"
            @click="moClicked(item.id)"
            :loading="iswaitting"
          >修改</ui-button>
          <ui-button
            color="primary"
            icon="delete"
            @click="delClicked(item.id)"
            :loading="iswaitting"
          >删除</ui-button>
        </span>
      </Card>
    </div>
    <Page
      v-if="departments.totalPage>1"
      :total="departments.totalPage"
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
      departments: {},
      search: { pageRow: 10 },
      iswaitting: false
    };
  },
  methods: {
    getInfo() {
      fetch({
        method: "Post",
        url: this.$store.state.host + "/department/list",
        data: JSON.stringify(this.search)
      })
        .then(res => {
          this.departments = res.data.info;
        })
        .catch();
    },
    onPageChange(page) {
      this.search.pageNum = page;
      this.getInfo();
    },
    delClicked(id) {
      let da = { id: id };
      fetch({
        method: "Post",
        url: this.$store.state.host + "/department/deleteDepartment",
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
