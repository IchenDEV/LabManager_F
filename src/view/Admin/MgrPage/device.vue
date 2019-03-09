<template>
  <div class="flex-panel warp">
    <Card
      :bordered="false"
      class="card max-w"
    >
      <add-device @added="rel" />
    </Card>
    <list-device
      ref="deviceList"
      admin="true"
    />
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
