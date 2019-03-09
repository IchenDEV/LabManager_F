<template>
  <div class="add-department">
    <user-selector
      v-if="quickid===null"
      v-model="s"
      :label="label"
    />
    <h2 v-if="quickname!=null">
      {{ $t('message.send') }} {{ quickname }}
    </h2>
    <ui-textbox
      v-model="con.msg"
      icon="lock"
      floating-label
      :label="$t('message.message')"
    />
    <ui-button
      color="primary"
      icon="send"
      :loading="iswaitting"
      :disabled="con.msg===''||con.msg===null||(s==null&&quickid==null)"
      @click="addClicked"
    >
      {{ $t('message.send') }}
    </ui-button>
  </div>
</template>
<script>
import tools from "@/util/tools.js";
import userSelector from "@/components/User/UserSelector";
export default {
  components: { userSelector },
  props: {
    label: { default: "" },
    quickid: { default: null },
    quickname: { default: null }
  },
  data() {
    return {
      s: null,
      con: {
        receiver: 0,
        msg: null,
        author: this.$store.state.currentUser.id,
        status: 1
      },
      iswaitting: false
    };
  },
  methods: {
    addClicked() {
      this.iswaitting = true;
      /* eslint-disable */
      if (this.quickid != null) {
        this.con.receiver = this.quickid;
      } else {
        this.con.receiver = this.s.id;
      }
      tools.easyfetch(tools.Api.AddMsg,this.con)
       .then(() => {
          this.iswaitting = false;
          this.$emit('send')
        })
        .catch();
    }
  }
};
</script>
