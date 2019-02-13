<template>
  <div class="flex-panel">
    <Card>
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
