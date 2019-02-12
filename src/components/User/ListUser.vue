<template>
<div>
  <div class="flex-panel">
    <Card v-for="(item,index) in users.list" :key="index">
      <p slot="title">{{item.username}}</p>
      <p>{{item.userId}}</p>
      <p>{{item.nickname}}</p>
      <p>{{item.roleName}}</p>
      <p>{{item.phone}}</p>
      <span>
      <ui-button color="primary" icon="delete" @click="moClicked(item.userId)" :loading="iswaitting">修改</ui-button>
      <ui-button color="primary" icon="delete" @click="delClicked(item.userId)" :loading="iswaitting">删除</ui-button>
      </span>
    </Card>
  </div>
  <Page v-if="users.totalPage>1" :total="users.totalPage" :page-size="conp.pageRow" show-elevator @on-change="onPageChange"/>
</div>
</template>
<script>
import fetch from '@/util/fetch.js'
export default {
  data () {
    return {
      users: {},
      conp: { pageRow: 10 }
    }
  },
  methods: {
    getInfo () {
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/user/list',
        data: JSON.stringify(this.conp)
      })
        .then(res => {
          this.users = res.data.info
        })
        .catch()
    },
    onPageChange (page) {
      this.conp.pageNum = page
      this.getInfo()
    },
    delClicked (id) {
      let da = {id: id}
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/user/delUser',
        data: JSON.stringify(da)
      })
        .then()
        .catch()
    }
  },
  mounted () {
    this.getInfo()
  }
}
</script>
