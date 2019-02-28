<template>
  <div>
    <Card>
      <h2>{{$t('message.modify')}} {{$t('message.department')}}</h2>
        <div class="flex-panel">
          <ui-textbox icon='phone' floating-label :label="$t('message.name')" v-model='item.name'></ui-textbox>
          <ui-textbox icon='phone' floating-label :label="$t('message.description')" v-model='item.description'></ui-textbox>
        </div>
        <ui-button color="primary" icon="update" @click="updateClick" :loading="iswaitting">{{$t('message.update')}}</ui-button>
    </Card>
  <div class="flex-panel">
    <Card>
        <div>
          <h2>{{$t('message.add')}} {{$t('message.user')}}</h2>
          <user-selector v-model="s" :label="$t('message.user')"></user-selector>
          <ui-button color="primary" icon="add" @click="addUserClick" :loading="iswaitting">添加</ui-button>
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
export default {
  components: { userSelector },
  data () {
    return {
      search: { id: this.$route.params.id, pageRow: 1},
      search2: { department: this.$route.params.id, pageRow: 10, pageNum: 1 },
      item: {},
      userInfo: {},
      s: {},
      iswaitting: false
    }
  },
  methods: {
    getDepartmentInfo () {
      for (var key in this.search) {
        if (this.search[key] === null || this.search[key] === '') {
          delete this.search[key]
        }
      }
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/department/list',
        data: JSON.stringify(this.search)
      })
        .then(res => {
          this.item = res.data.info.list[0]
        })
        .catch()
    },
    getDepartmentUserInfo () {
      for (var key in this.search2) {
        if (this.search2[key] === null || this.search2[key] === '') {
          delete this.search2[key]
        }
      }
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/department/listUser',
        data: JSON.stringify(this.search2)
      })
        .then(res => {
          this.userInfo = res.data.info
        })
        .catch()
    },
    addUserClick () {
      this.iswaitting = true
      let cons = {user: this.s.id,department: this.$route.params.id,status:1}
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/department/addDepartmentUser',
        data: JSON.stringify(cons)
      })
        .then(this.iswaitting = false)
        .catch()
    },
    deleteUserClick (id) {
      this.iswaitting = true
      let cons = {id:id}
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/department/deleteDepartmentUser',
        data: JSON.stringify(cons)
      })
      .then(this.iswaitting = false)
      .catch()
    },
    onPageChange (page) {
      this.search2.pageNum = page
      this.getDepartmentUserInfo()
    },
   updateClick () {
      this.iswaitting = true
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/department/updateDepartment',
        data: JSON.stringify(this.item)
      })
      .then(this.iswaitting = false)
      .catch()
    }
  },
  mounted () {
    this.getDepartmentUserInfo()
    this.getDepartmentInfo()
  }
}
</script>
