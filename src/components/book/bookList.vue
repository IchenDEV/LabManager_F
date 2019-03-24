<template>
  <div>
    <Card class="ms-depth-16"   >
    <h1>{{$t('message.appointment')}} {{$t('message.list')}}</h1>  
    <div class="flex-panel">
      <!--将id的图标进行修改为code-->
      <ui-textbox icon="code" floating-label label="id" v-model="search.id"></ui-textbox>
      <user-selector v-model="user" :label="$t('message.user')"></user-selector>
      <project-selector v-model="project" :label="$t('message.project')"></project-selector>
    </div>
    <ui-button color="primary" icon="search" @click="searchClicked">{{$t('message.search')}}</ui-button>
    <ui-button color="primary" icon="cloud_download" @click="exportExcel">{{$t('message.export')}}</ui-button>
    </Card>
    <div class="flex-panel">
      <Card class="ms-depth-16"    v-for="(item,index) in books.list" :key="index">
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
      <Card class="ms-depth-16"    v-if="books.totalCount===0">
        <div>{{$t('message.findless')}} {{$t('message.appointment')}}</div>
      </Card>
    </div>
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
    exportExcel(){
      tools.fetchFile(tools.Api.ExportBook,this.search)
        .then(res => {
          this.$store.commit('download',res.data);
        })
    },
    getInfo() {
      if (this.user != null) {
        this.search.applicant = this.user.id;
      }
      if (this.project != null) {
        this.search.project = this.project.id;
      }
      tools.easyfetch(tools.Api.ListBook,this.search)
      .then(res => {
          this.books = res.data.info;
        })
    },
    onPageChange(page) {
      this.search.pageNum = page;
      this.getInfo();
    },
    delClicked(id, index) {
      let da = { id: id }
      this.books.list.splice(index, 1)
      tools.easyfetch(tools.Api.DelBook,da)
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
