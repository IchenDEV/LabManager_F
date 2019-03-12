<template>
  <div class="flex-panel warp">
    <Card :class="{'modelCard':$store.state.modal}"
      :bordered="false"
      class="Card max-w"
    >
      <add-group @added="rel" />
    </Card>
    <list-group ref="groupList" />
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
