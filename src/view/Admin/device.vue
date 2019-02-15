<template>
  <div class="flex-panel warp">
    <Card class="card">
      <add-device></add-device>
    </Card>
      <list-device admin="true"></list-device>
  </div>
</template>
<script>
import AddDevice from '@/components/Device/AddDevice'
import ListDevice from '@/components/Device/ListDevice'
export default {
  components: { AddDevice, ListDevice }
}
</script>
<style>
.warp {
  flex-wrap: wrap;
}
@media only screen and (min-width: 1280px) {
  .warp {
    flex-wrap: nowrap;
  }
}
</style>
