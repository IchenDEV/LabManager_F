<template>
  <div>
    <Card class="ms-depth-16">
      <h2>{{$t('message.group')}} {{item.name}}</h2>
      <div class="flex-panel">
        <ui-textbox
          icon="phone"
          floating-label
          :label="$t('message.description')"
          v-model="item.description"
        ></ui-textbox>
      </div>
    </Card>
    <Card class="ms-depth-16" v-if="$store.state.isListMode">
      <ou-list style="text-align:left;">
        <ou-list-item
          v-for="(item,index) in projectInfo.list"
          :key="index"
          isSelectable
          :primaryText="item.name"
          :tertiaryText="item.description"
          :metaText="item.createTime"
        >
          <ou-list-actions>
            <ou-list-action-item icon="Delete" @click="deleteProjectClick(item.id)"></ou-list-action-item>
          </ou-list-actions>
        </ou-list-item>
      </ou-list>
    </Card>
    <Card v-else class="ms-depth-16" v-for="(item,index) in projectInfo.list" :key="index">
      <div>
        <h2>{{$t('message.project')}} {{item.name}}</h2>
        <ui-button
          color="primary"
          icon="delete"
          @click="deleteProjectClick(item.id)"
          :loading="iswaitting"
        >{{$t('message.delete')}}</ui-button>
      </div>
    </Card>
    <Page
      size="small"
      v-if="projectInfo.totalPage>1"
      :total="projectInfo.totalPage"
      :page-size="search3.pageRow"
      show-elevator
      @on-change="onPageChange2"
    />
    <Card class="ms-depth-16" v-if="$store.state.isListMode">
      <ou-list style="text-align:left;">
        <ou-list-item
          v-for="(item,index) in userInfo.list"
          :key="index"
          isSelectable
          :primaryText="item.nickname"
          :metaText="item.createTime"
        >
          <ou-list-actions>
            <ou-list-action-item icon="Delete" @click="deleteUserClick(item.id)"></ou-list-action-item>
          </ou-list-actions>
        </ou-list-item>
      </ou-list>
    </Card>
    <Card v-else class="ms-depth-16" v-for="(item,index) in userInfo.list" :key="index">
      <div>
        <h2>{{$t('message.user')}} {{item.user}}</h2>
        <p>{{$t('message.Uname')}} {{item.nickname}}</p>
        <ui-button
          color="primary"
          icon="delete"
          @click="deleteUserClick(item.id)"
          :loading="iswaitting"
        >{{$t('message.delete')}}</ui-button>
      </div>
    </Card>
    <Page
      size="small"
      v-if="userInfo.totalPage>1"
      :total="userInfo.totalPage"
      :page-size="search2.pageRow"
      show-elevator
      @on-change="onPageChange"
    />
  </div>
</template>
<script>
import tools from "@/util/tools.js";
export default {
  data() {
    return {
      search: { id: this.$route.params.id, pageRow: 1 },
      search2: { group: this.$route.params.id, pageRow: 10, pageNum: 1 },
      search3: { group: this.$route.params.id, pageRow: 10, pageNum: 1 },
      item: {},
      userInfo: {},
      projectInfo: {},
      s: {},
      p: {},
      iswaitting: false
    };
  },
  methods: {
    getGroupInfo() {
      tools.easyfetch(tools.Api.ListGroup, this.search).then(res => {
        this.item = res.data.info.list[0];
      });
      this.getGroupUserInfo();
      this.getGroupProjectInfo();
    },
    getGroupUserInfo() {
      tools.easyfetch(tools.Api.ListGroupUser, this.search2).then(res => {
        this.userInfo = res.data.info;
      });
    },
    getGroupProjectInfo() {
      tools.easyfetch(tools.Api.ListGroupProject, this.search3).then(res => {
        this.projectInfo = res.data.info;
      });
    },
    onPageChange(page) {
      this.search2.pageNum = page;
      this.getGroupUserInfo();
    },
    onPageChange2(page) {
      this.search3.pageNum = page;
      this.getGroupProjectInfo();
    }
  },
  mounted() {
    this.getGroupInfo();
  }
};
</script>
