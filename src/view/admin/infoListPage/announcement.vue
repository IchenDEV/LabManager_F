<template>
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
      :title="$t('message.create') +$t('message.announcement')"
      v-model="multilineDialogVisible"
    >
      <add-announcement @added="refresh"/>
    </ou-dialog>
    <Card class="ms-depth-16">
      <p slot="title">{{ $t('message.announcement') }}</p>
      <announcement-list admin="true"/>
    </Card>
  </div>
</template>
<script>
import addAnnouncement from "@/components/announcement/addAnnouncement";
import announcementList from "@/components/announcement/announcementList";
export default {
  components: { addAnnouncement, announcementList },
  data() {
    return {
      multilineDialogVisible: false
    };
  },
  methods: {
    refresh() {
      this.multilineDialogVisible = false;
      this.$refs.announcementList.getInfo();
    }
  }
};
</script>