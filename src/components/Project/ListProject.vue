<template>
  <div>
    <h2>{{$t('message.project')}} {{$t('message.list')}}</h2>
    <div class="flex-panel">
      <ui-textbox icon="person" floating-label :label="$t('message.name')" v-model="search.name"></ui-textbox>
      <ui-textbox icon="code" floating-label label="id" v-model="search.id"></ui-textbox>
    </div>
    <ui-button color="primary" icon="search" @click="searchClicked">{{$t('message.search')}}</ui-button>
    <div class="flex-panel">
      <Card v-for="(item,index) in projects.list" :key="index">
        <p slot="title">
          {{item.name}}
          <Tag color="success" v-if="item.status===1">{{$t('message.working')}}</Tag>
          <Tag color="error" v-if="item.status===0">{{$t('message.done')}}</Tag>
          <Tag color="warning" v-if="item.status===3">{{$t('message.pause')}}</Tag>
        </p>
        <p>id：{{item.id}}</p>
        <p>{{$t('message.description')}} {{item.description}}</p>
        <p>{{$t('message.createTime')}} {{item.createTime}}</p>
        <p>{{$t('message.beginTime')}} {{item.beginTime}}</p>
        <p>{{$t('message.endTime')}} {{item.endTime}}</p>
        <span>
          <ui-button
            color="primary"
            icon="adjust"
            @click="moClicked(item.id)"
            :loading="iswaitting"
          >{{$t('message.modify')}}</ui-button>
          <ui-button
            color="primary"
            icon="delete"
            @click="delClicked(item.id,index)"
            :loading="iswaitting"
          >{{$t('message.delete')}}</ui-button>
        </span>
      </Card>
      <Card v-if="projects.totalCount===0">
        <div>{{$t('message.findless')}} {{$t('message.project')}} </div>
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
import fetch from "@/util/fetch.js"
import router from '@/router'
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
    },
    moClicked (id){
      router.push("project/"+id.toString())
    }
  },
  mounted() {
    this.getInfo();
  }
};
</script>