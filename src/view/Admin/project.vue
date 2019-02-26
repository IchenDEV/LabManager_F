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
