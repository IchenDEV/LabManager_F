<template>
  <div>
    <Card>
        <div>
          <h2>设备 {{item.id}}</h2>
          <p>名称 {{item.name}}</p>
          <p>编号 {{item.No}}</p>
          <p>品牌 {{item.band}}</p>
          <p>描述 {{item.description}}</p>
          <p>型号 {{item.model}}</p>
          <p>位置 {{item.locationName}}</p>
          <p>{{item.locationDescription}}</p>
          <p>地址 {{item.locationAddress}}</p>
        </div>
      </Card>
  </div>
</template>
<script>
import fetch from '@/util/fetch.js'
export default {
  data () {
    return {
      search: { device: this.$route.params.id, pageRow: 10, offSet: 0 },
      search2: { id: this.$route.params.id, pageRow: 1, offSet: 0 },
      item: {}
    }
  },
  methods: {
    getDeviceBookInfo () {
      for (var key in this.search) {
        if (this.search[key] === null || this.search[key] === '') {
          delete this.search[key]
        }
      }
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/book/list',
        data: JSON.stringify(this.search)
      })
        .then(res => {
          //  this.info = res.data.info;
          console.log(res)
        })
        .catch(function (err) {
          console.log(err)
          //  this.showErrorMsg();
        })
    },
    getDeviceInfo () {
      for (var key in this.search2) {
        if (this.search2[key] === null || this.search2[key] === '') {
          delete this.search2[key]
        }
      }
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/device/list',
        data: JSON.stringify(this.search2)
      })
        .then(res => {
          this.item = res.data.info.list[0]
          console.log(res.data)
        })
        .catch(function (err) {
          console.log(err)
          this.showErrorMsg()
        })
    }
  },
  mounted () {
    this.getDeviceBookInfo()
    this.getDeviceInfo()
  }
}
</script>
