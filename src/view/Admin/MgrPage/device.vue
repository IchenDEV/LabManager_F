<template>
  <div class="flex-panel warp">
    <Card :bordered="false"  class="card max-w">
      <add-device @added='rel'></add-device>
    </Card>
      <list-device admin="true" ref="deviceList"></list-device>
  </div>
</template>
<script>
import AddDevice from '@/components/Device/AddDevice'
import ListDevice from '@/components/Device/ListDevice'
export default {
  components: { AddDevice, ListDevice },
  methods:{
    rel (){
      this.$refs.deviceList.getInfo()
    }
  }
}
</script>
