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
      :title="$t('message.create') +$t('message.project')"
      v-model="multilineDialogVisible"
    >
      <add-project @added="refresh"/>
    </ou-dialog>
    <project-list ref="projectList"/>
  </div>
</template>
<script>
import AddProject from "@/components/project/AddProject";
import projectList from "@/components/project/projectList";
export default {
  components: { AddProject, projectList },
  data() {
    return {
      multilineDialogVisible: false
    };
  },
  methods: {
    refresh() {
      this.multilineDialogVisible = false;
      this.$refs.projectList.getInfo();
    }
  }
};
</script>
