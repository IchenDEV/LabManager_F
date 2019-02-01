<template>
  <div>
    <h1>设备</h1>
    <button @click='getDeviceInfo' ></button>
    <p>{{$route.params.id}}</p>
  </div>
</template>
<script>
import fetch from '@/util/fetch.js'
export default {
  data () {
    return {
      search: { device: this.$route.params.id, pageRow: 10, offSet: 0 }
    }
  },
  methods: {
    getDeviceInfo () {
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
    }
  },
  mounted () {
    this.getDeviceInfo()
  }
}
</script>
