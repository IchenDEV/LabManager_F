<template>
  <div class="flex-panel warp">
    <Card :class="{'modelCard':$store.state.modal}"  class="max-w">
      <add-group @added="refresh" />
    </Card>
    <group-list ref="groupList" />
  </div>
</template>
<script>
import AddGroup from '@/components/group/AddGroup'
import groupList from '@/components/group/groupList'
export default {
  components: { AddGroup, groupList },
  methods:{
    refresh (){
      this.$refs.groupList.getInfo()
    }
  }
}
</script>
