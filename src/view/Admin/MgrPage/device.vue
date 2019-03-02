<template>
  <div class="flex-panel warp">
    <Card class="card">
      <add-device @added='rel'></add-device>
    </Card>
      <list-device admin="true"></list-device>
  </div>
</template>
<script>
import AddDevice from '@/components/Device/AddDevice'
import ListDevice from '@/components/Device/ListDevice'
export default {
  components: { AddDevice, ListDevice },
  inject:  ['reloadAdmin'],
  methods:{
    rel (){
      this.reloadAdmin
    }
  }
}
</script>
