<template>
  <div class="flex-panel warp">
    <Card class="card">
      <add-department @added='rel'></add-department>
    </Card>
      <list-department></list-department>
  </div>
</template>
<script>
import AddDepartment from '@/components/Department/AddDepartment'
import ListDepartment from '@/components/Department/ListDepartment'
export default {
  components: { AddDepartment, ListDepartment },
  inject:  ['reloadAdmin'],
  methods:{
    rel (){
      this.reloadAdmin
    }
  }
}
</script>
