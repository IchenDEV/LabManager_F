<template>
  <div>
    <div class="flex-panel">
        <div v-for="(item,index) in department.list" :key="index">
            <p>{{item.name}}</p>
            <p>{{item.description}}</p>
            <p>{{item.status}}</p>
            <p>{{item.createTime}}</p>
            <p>{{item.updateTime}}</p>
        </div>
    </div>
  </div>
</template>
<script>
import fetch from '@/util/fetch.js'
export default {
  data () {
    return {
      department: {}
    }
  },
  methods: {
    getInfo () {
      let conp = { pageRow: 100, offSet: 0 }
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/department/list',
        data: JSON.stringify(conp)
      })
        .then(res => {
          console.log(res.data)
          this.department = res.data.info
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
}

.user-itme {
  padding: 10px;
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
  min-width: 120px;
  max-width: 350px;
  width: 250px; /* 让过渡表现良好。（从/到'width:auto'的过渡
                      至少在 Gecko 和 Webkit 上是有 bug 的。
                      更多信息参见 http://bugzil.la/731886 ） */

  -webkit-transition: width 0.7s ease-out;
  transition: width 0.7s ease-out;
}
</style>
