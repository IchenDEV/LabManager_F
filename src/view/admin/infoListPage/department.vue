<template>
  <div class="flex-panel warp">
    <Card :class="{'modelCard':$store.state.modal}"  class="max-w">
      <add-department @added="refresh" />
    </Card>
    <department-list ref="departmentList" />
  </div>
</template>
<script>
import AddDepartment from "@/components/department/AddDepartment";
import departmentList from "@/components/department/departmentList";
export default {
  components: { AddDepartment, departmentList },
  methods: {
    refresh() {
      this.$refs.departmentList.getInfo();
    }
  }
};
</script>
