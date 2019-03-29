<template>
  <div class="col-panel">
    <Card class="ms-depth-16" style="min-width:350px;">
      <add-device @added="refresh" />
    </Card>
    <device-box ref="deviceList" admin="true" />
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
