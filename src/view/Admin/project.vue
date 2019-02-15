<template>
<div>
  <div class="flex-panel warp">
    <Card class="card">
      <add-project/>
    </Card>
    <list-project></list-project>
  </div>
</div>
</template>
<script>
import AddProject from '@/components/Project/AddProject'
import ListProject from '@/components/Project/ListProject'
export default {
  components: { AddProject, ListProject },
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
