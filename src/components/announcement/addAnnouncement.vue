<template>
  <div class="add-announcement">
    <ui-textbox icon="person" floating-label :label="$t('message.title')" v-model="con.title"></ui-textbox>
    <ui-textbox icon="lock" floating-label :label="$t('message.summary')" v-model="con.summary"></ui-textbox>
    <quill-editor v-model="con.msg"></quill-editor>
    <ui-button
      color="primary"
      icon="check"
      @click="addClicked"
      :disabled="disable"
      :loading="iswaitting"
    >{{$t('message.create')}}</ui-button>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import tools from "@/util/tools.js";
export default {
  data() {
    return {
      con: {
        title: "",
        summary: "",
        status: 1,
        author: this.$store.state.currentUser.id
      },
      iswaitting: false
    };
  },
  computed: {
    disable() {
      return (
        this.con.title == "" || this.con.summary == "" || this.con.msg == ""
      );
    }
  },
  methods: {
    addClicked() {
      this.$Loading.start();
      tools.easyfetch(tools.Api.AddAnnouncement, this.con).then(() => {
        this.$Loading.finish();
        this.$Notice.success({
          title: "Success"
        });
        this.$emit("added");
      });
    }
  },
  watch: {
    edit() {
      if (this.edit != null) {
        this.con.title = this.edit.title;
        this.con.summary = this.edit.summary;
        this.con.msg = this.edit.msg;
      }
    }
  }
};
</script>