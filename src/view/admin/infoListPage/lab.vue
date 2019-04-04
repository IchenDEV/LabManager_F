<template>
  <div>
    <div>
      <Card class="ms-depth-16 max-w">
        <ou-command-bar>
          <template slot="main">
            <ou-command-button icon="Add" @click="multilineDialogVisible=true">新建</ou-command-button>
          </template>
          <template slot="side">
            <ou-command-button icon="Emoji2" type="noLabel"></ou-command-button>
          </template>
        </ou-command-bar>
      </Card>
      <ou-dialog
        type="multiline"
        :title="$t('message.create') +$t('message.device')"
        v-model="multilineDialogVisible"
      >
        <add-lab @added="refresh"/>
      </ou-dialog>
      <lab-list ref="labList"/>
    </div>
  </div>
</template>
<script>
import AddLab from "@/components/lab/AddLab";
import labList from "@/components/lab/labList";
export default {
  data() {
    return {
      multilineDialogVisible: false
    };
  },
  components: { AddLab, labList },
  methods: {
    refresh() {
      this.multilineDialogVisible = false;
      this.$refs.labList.getInfo();
    }
  }
};
</script>

