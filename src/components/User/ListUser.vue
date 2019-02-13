<template>
<div>
  <h2>用户列表</h2>
  <div class="flex-panel">
    <Card v-for="(item,index) in users.list" :key="index">
      <p slot="title">用户名 {{item.username}}</p>
      <p>用户id {{item.userId}}</p>
      <p>姓名 {{item.nickname}}</p>
      <p>角色 {{item.roleName}}</p>
      <p>电话 {{item.phone}}</p>
      <span>
      <ui-button color="primary" icon="adjust" @click="moClicked(item.userId)" :loading="iswaitting">修改</ui-button>
      <ui-button v-if="item.userId!==10003" color="primary" icon="delete" @click="delClicked(item.userId,index)" :loading="iswaitting">删除</ui-button>
      </span>
    </Card>
  </div>
  <Page v-if="users.totalPage>1" :total="users.totalPage" :page-size="conp.pageRow" show-elevator @on-change="onPageChange"/>
</div>
</template>
<script>
import fetch from '@/util/fetch.js'
import router from '@/router'
export default {
  data () {
    return {
      users: {},
      conp: { pageRow: 10 },
      iswaitting: false  
    }
  },
  methods: {
    getInfo () {
      this.iswaitting=true;
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/user/list',
        data: JSON.stringify(this.conp)
      })
        .then(res => {
          this.users = res.data.info
          this.iswaitting=false;
        })
        .catch()
        this.iswaitting=false;
    },
    onPageChange (page) {
      this.conp.pageNum = page
      this.getInfo()
    },
    delClicked (id,index) {
      this.info.list.splice(index, 1)
      let da = {id: id}
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/user/delUser',
        data: JSON.stringify(da)
      })
        .then()
        .catch()
    },
    moClicked (id){
      router.push("user/"+id.toString())
    }
  },
  mounted () {
    this.getInfo()
  }
}
</script>
