<template>
  <div class="flex-panel warp">
    <Card
      :bordered="false"
      class="card max-w"
    >
      <add-department @added="rel" />
    </Card>
    <list-department ref="departmentList" />
  </div>
</template>
<script>
import AddDepartment from "@/components/Department/AddDepartment";
import ListDepartment from "@/components/Department/ListDepartment";
export default {
  components: { AddDepartment, ListDepartment },
  methods: {
    rel() {
      this.$refs.departmentList.getInfo();
    }
  }
};
</script>
