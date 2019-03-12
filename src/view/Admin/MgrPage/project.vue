<template>
  <div>
    <div class="flex-panel warp">
      <Card :class="{'modelCard':$store.state.modal}"
        :bordered="false"
        class="Card max-w"
      >
        <add-project @added="rel" />
      </Card>
      <list-project ref="projectList" />
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
