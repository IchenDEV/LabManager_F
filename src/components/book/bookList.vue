<template>
  <div>
    <Card class="ms-depth-16">
      <h1>{{$t('message.appointment')}} {{$t('message.list')}}</h1>
      <div class="flex-panel">
        <ui-textbox icon="code" floating-label label="id" v-model="search.id"></ui-textbox>
        <user-selector v-model="user" :label="$t('message.user')"></user-selector>
        <project-selector v-model="project" :label="$t('message.project')"></project-selector>
      </div>
      <ui-button color="primary" icon="search" @click="searchClicked">{{$t('message.search')}}</ui-button>
      <ui-button color="primary" icon="cloud_download" @click="exportExcel">{{$t('message.export')}}</ui-button>
    </Card>
    <Card class="ms-depth-16" v-if="$store.state.isListMode">
      <ou-spinner v-if="books.list==null" label="Loading..." type="large"/>
      <ou-list style="text-align:left;">
        <ou-list-item
          v-for="(item,index) in books.list"
          :key="index"
          isSelectable
          :primaryText="item.applicantNickname+' '+item.deviceName+' '+item.projectName"
          :tertiaryText="item.beginTime+ '~' +item.endTime"
          :metaText="item.createTime"
        >
          <ou-list-actions>
            <ou-list-action-item
              icon="Delete"
              v-if="item.applicant==$store.state.currentUser.id||$store.state.isAdmin"
              @click="delClicked(item.id,index)"
            ></ou-list-action-item>
            <!-- <ou-list-action-item icon="Edit" v-if="admin" @click="modifyClicked(item.id)"></ou-list-action-item> -->
          </ou-list-actions>
        </ou-list-item>
      </ou-list>
    </Card>
    <div v-else class="flex-panel">
      <Card class="ms-depth-16" v-for="(item,index) in books.list" :key="index">
        <p slot="title">{{item.applicantNickname}}</p>
        <p>{{item.id}}</p>
        <p>{{item.projectName}}</p>
        <p>{{item.deviceName}}</p>
        <p>{{item.beginTime}} ~ {{item.endTime}}</p>
        <p>{{item.createTime}}</p>
        <span>
          <ui-button
            v-if="item.applicant==$store.state.currentUser.id||$store.state.isAdmin"
            color="primary"
            icon="delete"
            @click="delClicked(item.id,index)"
            :loading="iswaitting"
          >{{$t('message.delete')}}</ui-button>
        </span>
      </Card>
    </div>
    <Card class="ms-depth-16" v-if="books.totalCount===0">
      <div>{{$t('message.findless')}} {{$t('message.appointment')}}</div>
    </Card>
    <Page
      size="small"
      v-if="books.totalPage>1"
      :total="books.totalPage"
      :page-size="search.pageRow"
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
      books: {},
      search: { pageRow: 10 },
      iswaitting: false,
      user: null,
      project: null
    };
  },
  methods: {
    /* eslint-disable */
    exportExcel() {
      tools.fetchFile(tools.Api.ExportBook, this.search).then();
    },
    getInfo() {
      if (this.user != null) {
        this.search.applicant = this.user.id;
      }
      if (this.project != null) {
        this.search.project = this.project.id;
      }
      tools.easyfetch(tools.Api.ListBook, this.search).then(res => {
        this.books = res.data.info;
      });
    },
    onPageChange(page) {
      this.search.pageNum = page;
      this.getInfo();
    },
    delClicked(id, index) {
      let da = { id: id };
      this.books.list.splice(index, 1);
      tools.easyfetch(tools.Api.DelBook, da);
    },
    searchClicked() {
      this.getInfo();
    }
  },
  mounted() {
    this.getInfo();
  }
};
</script>
