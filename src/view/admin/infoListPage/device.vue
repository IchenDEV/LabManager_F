<template>
  <div class="flex-panel warp">
    <Card :class="{'modelCard':$store.state.modal}" :bordered="false" class="Card max-w">
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
