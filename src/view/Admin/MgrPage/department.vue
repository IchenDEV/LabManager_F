<template>
  <div class="flex-panel warp">
    <Card :class="{'modelCard':$store.state.modal}"
      :bordered="false"
      class="Card max-w"
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
