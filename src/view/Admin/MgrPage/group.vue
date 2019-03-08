<template>
  <div class="flex-panel warp">
    <Card :bordered="false"  class="card max-w">
      <add-group @added='rel'></add-group>
    </Card>
      <list-group ref="groupList"></list-group>
  </div>
</template>
<script>
import AddGroup from '@/components/Group/AddGroup'
import ListGroup from '@/components/Group/ListGroup'
export default {
  components: { AddGroup, ListGroup },
  methods:{
    rel (){
      this.$refs.groupList.getInfo()
    }
  }
}
</script>
