<template>
  <div>
    <Card class="ms-depth-16 max-w">
      <ou-command-bar>
        <template slot="main">
          <ou-command-button icon="Add" @click="multilineDialogVisible=true">新建</ou-command-button>
        </template>
        <template slot="side">
          <ou-command-button icon="CircleRing" type="noLabel"></ou-command-button>
        </template>
      </ou-command-bar>
    </Card>
    <ou-dialog
      type="multiline"
      :title="$t('message.create') +$t('message.department')"
      v-model="multilineDialogVisible"
    >
      <add-department @added="refresh"/>
    </ou-dialog>
    <department-list ref="departmentList"/>
  </div>
</template>
<script>
import AddDepartment from "@/components/department/AddDepartment";
import departmentList from "@/components/department/departmentList";
export default {
  components: { AddDepartment, departmentList },
  data() {
    return {
      multilineDialogVisible: false
    };
  },
  methods: {
    refresh() {
      this.multilineDialogVisible = false;
      this.$refs.departmentList.getInfo();
    }
  }
};
</script>
