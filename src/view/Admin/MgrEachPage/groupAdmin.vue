<template>
  <div>
    <Card>
      <h2>{{$t('message.modify')}} {{$t('message.group')}}</h2>
        <div class="flex-panel">
          <ui-textbox icon='phone' floating-label :label="$t('message.name')" v-model='item.name'></ui-textbox>
          <ui-textbox icon='phone' floating-label :label="$t('message.description')" v-model='item.description'></ui-textbox>
        </div>
        <ui-button color="primary" icon="update" @click="updateClick" :loading="iswaitting">{{$t('message.update')}}</ui-button>
    </Card>
    <div class="flex-panel">
    <Card>
        <div>
          <h2>{{$t('message.add')}} {{$t('message.project')}}</h2>
          <project-selector v-model="p" :label="$t('message.project')"></project-selector>
          <ui-button color="primary" icon="add" @click="addProjectClick" :loading="iswaitting">{{$t('message.add')}}</ui-button>
        </div>
    </Card>
    <Card v-for="(item,index) in projectInfo.list" :key="index" >
        <div>
          <h2>{{$t('message.project')}} {{item.name}}</h2>
          <ui-button color="primary" icon="delete" @click="deleteProjectClick(item.id)" :loading="iswaitting">{{$t('message.delete')}}</ui-button>
        </div>
    </Card>
  </div>
  <Page size="small" v-if="projectInfo.totalPage>1" :total="projectInfo.totalPage" :page-size="search3.pageRow" show-elevator @on-change="onPageChange2"/>
  <div class="flex-panel">
    <Card>
        <div>
          <h2>{{$t('message.add')}} {{$t('message.user')}}</h2>
          <user-selector v-model="s" :label="$t('message.user')"></user-selector>
          <ui-button color="primary" icon="add" @click="addUserClick" :loading="iswaitting">{{$t('message.add')}}</ui-button>
        </div>
    </Card>
    <Card v-for="(item,index) in userInfo.list" :key="index" >
        <div>
          <h2>{{$t('message.user')}} {{item.user}}</h2>
          <p>{{$t('message.Uname')}} {{item.nickname}}</p>
          <ui-button color="primary" icon="delete" @click="deleteUserClick(item.id)" :loading="iswaitting">{{$t('message.delete')}}</ui-button>
        </div>
    </Card>
  </div>
  <Page size="small" v-if="userInfo.totalPage>1" :total="userInfo.totalPage" :page-size="search2.pageRow" show-elevator @on-change="onPageChange"/>
  </div>
</template>
<script>
import fetch from '@/util/fetch.js'
import userSelector from '@/components/User/UserSelector'
import projectSelector from '@/components/Project/ProjectSelector'
export default {
  inject:  ['reloadAdmin'],
  components: { userSelector,projectSelector },
  data () {
    return {
      search: { id: this.$route.params.id, pageRow: 1},
      search2: { group: this.$route.params.id, pageRow: 10, pageNum: 1},
      search3: { group: this.$route.params.id, pageRow: 10, pageNum: 1},
      item: {},
      userInfo: {},
      projectInfo: {},
      s: {},
      p:{},
      iswaitting: false
    }
  },
  methods: {
    getGroupInfo () {
      for (var key in this.search) {
        if (this.search[key] === null || this.search[key] === '') {
          delete this.search[key]
        }
      }
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/group/list',
        data: JSON.stringify(this.search)
      })
        .then(res => {
          this.item = res.data.info.list[0]
        })
        .catch()
    },
    getGroupUserInfo () {
      for (var key in this.search2) {
        if (this.search2[key] === null || this.search2[key] === '') {
          delete this.search2[key]
        }
      }
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/group/listUser',
        data: JSON.stringify(this.search2)
      })
        .then(res => {
          this.userInfo = res.data.info
        })
        .catch()
    },
    getGroupProjectInfo () {
      for (var key in this.search3) {
        if (this.search3[key] === null || this.search3[key] === '') {
          delete this.search3[key]
        }
      }
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/group/listProject',
        data: JSON.stringify(this.search3)
      })
        .then(res => {
          this.projectInfo = res.data.info
        })
        .catch()
    },
    addUserClick () {
      this.iswaitting = true
      let cons = {user: this.s.id,group: this.$route.params.id,status:1}
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/group/addGroupUser',
        data: JSON.stringify(cons)
      })
        .then(()=>{this.iswaitting = false;this.reloadAdmin})
        .catch()
    },
    addProjectClick () {
      this.iswaitting = true
      let cons = {project: this.p.id ,group: this.$route.params.id,status:1}
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/group/addGroupProject',
        data: JSON.stringify(cons)
      })
        .then(()=>{this.iswaitting = false;this.reloadAdmin})
        .catch()
    },
    deleteUserClick (id) {
      this.iswaitting = true
      let cons = {id:id}
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/group/deleteGroupUser',
        data: JSON.stringify(cons)
      })
      .then(()=>{this.reloadAdmin})
      .catch()
    },
    deleteProjectClick (id) {
      this.iswaitting = true
      let cons = {id:id}
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/group/deleteGroupProject',
        data: JSON.stringify(cons)
      })
      .then(()=>{this.iswaitting = false;this.reloadAdmin})
      .catch()
    },
    onPageChange (page) {
      this.search2.pageNum = page
      this.getGroupUserInfo()
    },
    onPageChange2 (page) {
      this.search3.pageNum = page
      this.getGroupProjectInfo()
    },
   updateClick () {
      this.iswaitting = true
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/group/updateGroup',
        data: JSON.stringify(this.item)
      })
      .then(()=>{this.iswaitting = false})
      .catch()
    }
  },
  mounted () {
    this.getGroupUserInfo()
    this.getGroupProjectInfo()
    this.getGroupInfo()
  }
}
</script>
