<template>
  <div>
    <Card>
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
