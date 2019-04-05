<template>
  <div>
    <Card class="ms-depth-16">
      <h2>{{$t('message.project')}} {{$t('message.list')}}</h2>
      <div class="flex-panel">
        <ui-textbox
          icon="info_outline"
          floating-label
          :label="$t('message.name')"
          v-model="search.name"
        ></ui-textbox>
        <ui-textbox icon="code" floating-label label="id" v-model="search.id"></ui-textbox>
      </div>
      <ui-button color="primary" icon="search" @click="searchClicked">{{$t('message.search')}}</ui-button>
    </Card>
    <Card class="ms-depth-16" v-if="$store.state.isListMode">
      <ou-spinner v-if="projects.list==null||projects.list==''" label="Loading..." type="large"/>
      <ou-list style="text-align:left;">
        <ou-list-item
          v-for="(item,index) in projects.list"
          :key="index"
          isSelectable
          :primaryText="item.name"
          :secondaryText="item.beginTime+'~'+item.endTime"
          :tertiaryText="item.description"
          :metaText="item.createTime"
        >
          <ou-list-actions>
            <span>
              <Tag color="success" v-if="item.status===1">{{$t('message.working')}}</Tag>
              <Tag color="error" v-if="item.status===0">{{$t('message.done')}}</Tag>
              <Tag color="warning" v-if="item.status===3">{{$t('message.pause')}}</Tag>
            </span>
            <ou-list-action-item icon="Delete" @click="delClicked(item.id,index)"></ou-list-action-item>
            <ou-list-action-item icon="Edit" @click="moClicked(item.id)"></ou-list-action-item>
          </ou-list-actions>
        </ou-list-item>
      </ou-list>
    </Card>
    <div v-else class="flex-panel">
      <Card class="ms-depth-16" v-for="(item,index) in projects.list" :key="index">
        <p slot="title">
          {{item.name}}
          <Tag color="success" v-if="item.status===1">{{$t('message.working')}}</Tag>
          <Tag color="error" v-if="item.status===0">{{$t('message.done')}}</Tag>
          <Tag color="warning" v-if="item.status===3">{{$t('message.pause')}}</Tag>
        </p>
        <p>id {{item.id}}</p>
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
    </div>
    <Card class="ms-depth-16" v-if="projects.totalCount===0">
      <div>{{$t('message.findless')}} {{$t('message.project')}}</div>
    </Card>
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
import tools from "@/util/tools.js";
import router from "@/router";
export default {
  data() {
    return {
      projects: "",
      search: { pageRow: 10 },
      iswaitting: false
    };
  },
  methods: {
    getInfo() {
      tools.easyfetch(tools.Api.ListProject, this.search).then(res => {
        this.projects = res.data.info;
      });
    },
    onPageChange(page) {
      this.search.pageNum = page;
      this.getInfo();
    },
    delClicked(id, index) {
      this.projects.list.splice(index, 1);
      let data = { id: id };
      tools.easyfetch(tools.Api.DelProject, data);
    },
    searchClicked() {
      this.getInfo();
    },
    moClicked(id) {
      router.push("project/" + id.toString());
    }
  },
  mounted() {
    this.getInfo();
  }
};
</script>