<template>
  <div>
    <div class="flex-panel warp">
      <Card :class="{'modelCard':$store.state.modal}"  :bordered="false" class="max-w" >
        <add-project @added="refresh" />
      </Card>
      <project-list ref="projectList" />
    </div>
  </div>
</template>
<script>
import AddProject from '@/components/project/AddProject'
import projectList from '@/components/project/projectList'
export default {
  components: { AddProject, projectList },
  methods:{
    refresh (){
      this.$refs.projectList.getInfo()
    }
  }
}
</script>
