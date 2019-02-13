<template>
  <div class="flex-panel">
    <Card>
      <add-group></add-group>
    </Card>
      <list-group></list-group>
  </div>
</template>
<script>
import AddGroup from '@/components/Group/AddGroup'
import ListGroup from '@/components/Group/ListGroup'
export default {
  components: { AddGroup, ListGroup }
}
</script>