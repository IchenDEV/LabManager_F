<template>
  <div>
    <Card>
    <h1>{{$t('message.appointment')}} {{$t('message.list')}}</h1>  
    <div class="flex-panel">
      <ui-textbox icon="person" floating-label label="id" v-model="search.id"></ui-textbox>
      <user-selector v-model="user" :label="$t('message.user')"></user-selector>
      <project-selector v-model="project" :label="$t('message.project')"></project-selector>
    </div>
    <ui-button color="primary" icon="search" @click="searchClicked">{{$t('message.search')}}</ui-button>
    <ui-button color="primary" icon="search" @click="exportExcel">{{$t('message.export')}}</ui-button>
    </Card>
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
            v-if="item.applicant==$store.state.currentUser.id||$store.state.isAdmin"
            color="primary"
            icon="delete"
            @click="delClicked(item.id,index)"
            :loading="iswaitting"
          >{{$t('message.delete')}}</ui-button>
        </span>
      </Card>
      <Card v-if="books.totalCount===0">
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
import userSelector from "@/components/User/UserSelector";
import projectSelector from "@/components/Project/ProjectSelector";
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
      tools.fetchFile(tools.Api.ListAnnouncement,this.search)
        .then(res => {
          this.download(res.data)
        })
        .catch();
    },
     download (data) {
        if (!data) {
            return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'export.xlsx')

        document.body.appendChild(link)
        link.click()
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
        .catch();
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
      this.search=tools.removeEmptyKey(this.search)
      this.getInfo();
    }
  },
  mounted() {
    this.getInfo();
  }
};
</script>
