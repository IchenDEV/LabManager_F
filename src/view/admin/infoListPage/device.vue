<template>
  <div class="flex-panel warp">
    <Card   class="Card" style="max-width:400px;">
      <add-device @added="refresh" />
    </Card>
    <device-box ref="deviceList" admin="true"/>
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
