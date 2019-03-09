<template>
  <div class="add-announcement">
    <h2>{{ $t('message.create') }} {{ $t('message.announcement') }}</h2>
    <ui-textbox
      v-model="con.title"
      icon="person"
      floating-label
      :label="$t('message.title')"
    />
    <ui-textbox
      v-model="con.summary"
      icon="lock"
      floating-label
      :label="$t('message.summary')"
    />
    <quill-editor
      ref="myQuillEditor"
      v-model="con.msg"
      :options="editorOption"
    />
    <ui-button
      color="primary"
      icon="check"
      :disabled="disable"
      :loading="iswaitting"
      @click="addClicked"
    >
      {{ $t('message.create') }}
    </ui-button>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import tools from "@/util/tools.js";
export default {
  data() {
    return {
      content: null,
      editorOption: {
      },
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
      return this.con.title == "" || this.con.summary == "";
    }
  },
  methods: {
    addClicked() {
      this.iswaitting = true;
      tools.easyfetch(tools.Api.AddAnnouncement,this.con).then()
      this.iswaitting = false;
      this.$emit("added");
    }
  }
}
</script>