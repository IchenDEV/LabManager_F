<template>
  <div class="flex-panel warp">
    <device-box ref="deviceList" admin="true" style="max-width:750px;"/>
    <Card class="ms-depth-16">
      <add-device @added="refresh" />
    </Card>
  </div>
</template>
<script>
import AddDevice from '@/components/device/AddDevice'
import deviceBox from '@/components/device/deviceList'
export default {
  components: { AddDevice, deviceBox },
  methods:{
    refresh (){
      this.$refs.deviceList.getInfo()
    }
  }
}
</script>
