<template>
  <div class="flex-panel warp">
    <Card class="card">
      <add-department></add-department>
    </Card>
      <list-department></list-department>
  </div>
</template>
<script>
import AddDepartment from '@/components/Department/AddDepartment'
import ListDepartment from '@/components/Department/ListDepartment'
export default {
  components: { AddDepartment, ListDepartment }
}
</script>
<style>
.warp {
  flex-wrap: wrap;
}
@media only screen and (min-width: 1208px) {
  .warp {
    flex-wrap: nowrap;
  }
  .card {
    max-height: 400px;
  }
}
</style>
