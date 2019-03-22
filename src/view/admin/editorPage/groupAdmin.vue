<template>
  <div>
    <Card   >
      <h2>{{$t('message.modify')}} {{$t('message.group')}}</h2>
      <div class="flex-panel">
        <ui-textbox icon="phone" floating-label :label="$t('message.name')" v-model="item.name"></ui-textbox>
        <ui-textbox
          icon="phone"
          floating-label
          :label="$t('message.description')"
          v-model="item.description"
        ></ui-textbox>
      </div>
      <ui-button
        color="primary"
        icon="update"
        @click="updateClick"
        :loading="iswaitting"
      >{{$t('message.update')}}</ui-button>
    </Card>
    <div class="flex-panel">
      <Card   >
        <div>
          <h2>{{$t('message.add')}} {{$t('message.project')}}</h2>
          <project-selector v-model="p" :label="$t('message.project')"></project-selector>
          <ui-button
            color="primary"
            icon="add"
            @click="addProjectClick"
            :loading="iswaitting"
          >{{$t('message.add')}}</ui-button>
        </div>
      </Card>
      <Card    v-for="(item,index) in projectInfo.list" :key="index">
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
    </div>
    <Page
      size="small"
      v-if="projectInfo.totalPage>1"
      :total="projectInfo.totalPage"
      :page-size="search3.pageRow"
      show-elevator
      @on-change="onPageChange2"
    />
    <div class="flex-panel">
      <Card   >
        <div>
          <h2>{{$t('message.add')}} {{$t('message.user')}}</h2>
          <user-selector v-model="s" :label="$t('message.user')"></user-selector>
          <ui-button
            color="primary"
            icon="add"
            @click="addUserClick"
            :loading="iswaitting"
          >{{$t('message.add')}}</ui-button>
        </div>
      </Card>
      <Card    v-for="(item,index) in userInfo.list" :key="index">
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
    </div>
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
import userSelector from "@/components/user/userSelector";
import projectSelector from "@/components/project/projectSelector";
export default {
  components: { userSelector, projectSelector },
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
    addUserClick() {
      this.$Loading.start();
      let con = { user: this.s.id, group: this.$route.params.id, status: 1 };
      tools.easyfetch(tools.Api.AddGroupUser, con).then(() => {
        this.$Loading.finish();
        this.getGroupInfo();
      });
    },
    addProjectClick() {
      this.$Loading.start();
      let con = {
        project: this.p.id,
        group: this.$route.params.id,
        status: 1
      };
      tools.easyfetch(tools.Api.AddGroupProject, con).then(() => {
        this.$Loading.finish();
        this.getGroupInfo();
      });
    },
    deleteUserClick(id) {
      this.$Loading.start();
      let con = { id: id };
      tools.easyfetch(tools.Api.DelGroupUser, con).then(() => {
        this.getGroupInfo();
        this.$Loading.finish();
      });
    },
    deleteProjectClick(id) {
      this.$Loading.start();
      let con = { id: id };
      tools.easyfetch(tools.Api.DelGroupProject, con)
        .then(() => {
          this.$Loading.finish();
          this.getGroupInfo();
        })
        .catch();
    },
    onPageChange(page) {
      this.search2.pageNum = page;
      this.getGroupUserInfo();
    },
    onPageChange2(page) {
      this.search3.pageNum = page;
      this.getGroupProjectInfo();
    },
    updateClick() {
      this.$Loading.start();
      tools.easyfetch(tools.Api.UpdateGroup, this.item).then(() => {
        this.$Loading.finish();
        this.getGroupInfo();
      });
    }
  },
  mounted() {
    this.getGroupInfo();
  }
};
</script>
