<template>
<div>
  <div class="flex-panel">
    <Card>
      <add-lab/>
    </Card>
    <Card v-for="(item,index) in labs.list" :key="index">
      <p slot="title">{{item.name}}</p>
      <p>{{item.id}}</p>
      <p>{{item.location}}</p>
      <p>{{item.description}}</p>
      <p>{{item.createTime}}</p>
      <span>
      <ui-button color="primary" icon="delete" @click="moClicked(item.id)" :loading="iswaitting">修改</ui-button>
      <ui-button color="primary" icon="delete" @click="delClicked(item.id)" :loading="iswaitting">删除</ui-button>
      </span>
    </Card>
  </div>
  <Page v-if="labs.totalPage>1" :total="labs.totalPage" :page-size="conp.pageRow" show-elevator @on-change="onPageChange"/>
</div>
</template>
<script>
import fetch from '@/util/fetch.js'
import AddLab from '@/components/Lab/AddLab'
export default {
  data () {
    return {
      labs: {},
      conp: { pageRow: 10 },
      iswaitting: false
    }
  },
  components: { AddLab },
  methods: {
    getInfo () {
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/lab/list',
        data: JSON.stringify(this.conp)
      })
        .then(res => {
          console.log(res.data)
          this.labs = res.data.info
        })
        .catch(function (err) {
          console.log(err)
          this.showErrorMsg()
        })
    },
    onPageChange (page) {
      console.log(page)
      this.conp.pageNum = page
      this.getInfo()
    },
    delClicked (id) {
      let da = {id: id}
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/lab/deleteLab',
        data: JSON.stringify(da)
      })
        .then(res => {
          console.log(res.data)
        })
        .catch(function (err) {
          console.log(err)
          this.showErrorMsg()
        })
    }
  },
  mounted () {
    this.getInfo()
  }
}
</script>
<style>
.flex-panel {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: white
}
.sider{
  background-color: white
}
.flex-panel > div {
  padding: 10px;
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
  width: 300px; /* 让过渡表现良好。（从/到'width:auto'的过渡
                      至少在 Gecko 和 Webkit 上是有 bug 的。
                      更多信息参见 http://bugzil.la/731886 ） */

  -webkit-transition: width 0.7s ease-out;
  transition: width 0.7s ease-out;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  margin-top: 0.5rem
}
</style>
