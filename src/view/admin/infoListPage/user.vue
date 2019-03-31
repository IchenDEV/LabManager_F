<template>
  <div>
    <div>
      <Card class="ms-depth-16 max-w">
        <ou-command-bar>
          <template slot="main">
            <ou-command-button
              icon="Add"
              v-if="$store.state.isSuperAdmin"
              @click="multilineDialogVisible=true"
            >新建</ou-command-button>
          </template>
          <template slot="side">
            <ou-command-button icon="CircleRing" type="noLabel"></ou-command-button>
          </template>
        </ou-command-bar>
      </Card>
      <ou-dialog
        type="multiline"
        :title="$t('message.create') +$t('message.user')"
        v-model="multilineDialogVisible"
      >
        <add-user @added="refresh"/>
      </ou-dialog>
      <user-list ref="userList"/>
    </div>
  </div>
</template>
<script>
import AddUser from "@/components/user/AddUser";
import userList from "@/components/user/userList";
export default {
  components: { AddUser, userList },
  data() {
    return {
      multilineDialogVisible: false
    };
  },
  methods: {
    refresh() {
      this.multilineDialogVisible = false;
      this.$refs.userList.getInfo();
    }
  }
};
</script>
