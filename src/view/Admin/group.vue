<template>
  <div>
      <add-group></add-group>
  </div>
</template>
<script>
import fetch from '@/util/fetch.js'
import AddGroup from '@/components/Group/AddGroup'
export default {
  components: { AddGroup },
  methods: {
    getInfo () {
      let conp = { pageRow: 100, offSet: 0 }
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/group/list',
        data: JSON.stringify(conp)
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
