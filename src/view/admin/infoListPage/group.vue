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
      :title="$t('message.create') +$t('message.group')"
      v-model="multilineDialogVisible"
    >
      <add-group @added="refresh"/>
    </ou-dialog>
    <group-list ref="groupList"/>
  </div>
</template>
<script>
import AddGroup from "@/components/group/AddGroup";
import groupList from "@/components/group/groupList";
export default {
  data() {
    return {
      multilineDialogVisible: false
    };
  },
  components: { AddGroup, groupList },
  methods: {
    refresh() {
      this.multilineDialogVisible = false;
      this.$refs.groupList.getInfo();
    }
  }
};
</script>
