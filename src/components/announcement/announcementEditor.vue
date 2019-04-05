<template>
  <div>
    <ou-spinner v-if="con.msg==null||con.msg==''" label="Loading..." type="large"/>
    <ui-textbox icon="person" floating-label :label="$t('message.title')" v-model="con.title"></ui-textbox>
    <ui-textbox icon="lock" floating-label :label="$t('message.summary')" v-model="con.summary"></ui-textbox>
    <quill-editor v-model="con.msg"></quill-editor>
    <ui-button
      color="primary"
      icon="update"
      @click="addClicked"
      :disabled="disable"
      :loading="iswaitting"
    >{{$t('message.update')}}</ui-button>
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
        id: 0,
        title: "",
        summary: "",
        msg: "",
        status: 1
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
      tools.easyfetch(tools.Api.UpdateAnnouncement, this.con).then(() => {
        this.$Loading.finish();
        this.$Notice.success({
          title: "Success"
        });
        this.$emit("added");
      });
    },
    getAnnouncement(id) {
      let da = { id: id, pageRow: 10, pageNum: 0 };
      tools.easyfetch(tools.Api.GetAnnouncement, da).then(res => {
        this.con = res.data.info;
      });
    }
  }
};
</script>