<template>
  <div>
  <table>
  <tr v-for="(item,index) in logs.list" :key="index">
    <th>{{item.user}}</th>
    <th>{{item.operation}}</th>
    <th>{{item.targer}}</th>
    <th>{{item.createTime}}</th>
  </tr>
  </table>
  </div>
</template>
<script>
import fetch from '@/util/fetch.js'
export default {
  data () {
    return {
      logs: {}
    }
  },
  methods: {
    getInfo () {
      let conp = { pageRow: 100, offSet: 0 }
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/log/list',
        data: JSON.stringify(conp)
      })
        .then(res => {
          console.log(res.data)
          this.logs = res.data.info
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
