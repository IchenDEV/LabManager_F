<template>
  <div class="row-panel warp">
    <hot-device-box class="hdb"></hot-device-box>
    <device-box style="min-width:300px;margin:1.5rem;"></device-box>
  </div>
</template>
<script>
import DeviceBox from '@/components/Device/ListDevice'
import HotDeviceBox from '@/components/Device/ListHotDevice'
export default {
  components: { DeviceBox,HotDeviceBox }
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

