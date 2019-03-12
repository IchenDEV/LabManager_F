<template>
  <div class="flex-panel warp">
    <Card :class="{'modelCard':$store.state.modal}"
      :bordered="false"
      class="Card max-w"
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
