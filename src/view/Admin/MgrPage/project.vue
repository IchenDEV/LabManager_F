<template>
<div>
  <div class="flex-panel warp">
    <Card :bordered="false"  class="card max-w">
      <add-project @added='rel'/>
    </Card>
    <list-project ref="projectList"></list-project>
  </div>
</div>
</template>
<script>
import AddProject from '@/components/Project/AddProject'
import ListProject from '@/components/Project/ListProject'
export default {
  components: { AddProject, ListProject },
  methods:{
    rel (){
      this.$refs.projectList.getInfo()
    }
  }
}
</script>
