<template>
  <div class="row-panel warp">
    <hot-device-box class="hdb" />
    <device-box style="min-width:300px;margin:1.5rem;" />
  </div>
</template>
<script>
import deviceBox from '@/components/device/deviceList'
import hotDeviceBox from '@/components/device/hotDeviceList'
export default {
  components: { deviceBox,hotDeviceBox }
}
</script>
<style>
.hdb{
min-width: 100px;
width: 70%;
margin-left: auto;
margin-right: auto;
}
</style>

