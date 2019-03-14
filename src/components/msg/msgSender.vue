<template>
  <div class="add-department">
    <user-selector v-if="quickid===null" v-model="s" :label="label"></user-selector>
    <h2 v-if="quickname!=null">{{$t('message.send')}} {{quickname}}</h2>
    <ui-textbox icon="email" floating-label :label="$t('message.message')" v-model="con.msg"></ui-textbox>
    <!--上面的首页发送信息lock锁图标换成发送信息的图标email-->
    <ui-button
      color="primary"
      icon="send"
      @click="addClicked"
      :loading="iswaitting"
      :disabled="con.msg===''||con.msg===null||(s==null&&quickid==null)"
    >{{$t('message.send')}}</ui-button>
  </div>
</template>
<script>
import tools from "@/util/tools.js";
import userSelector from "@/components/user/userSelector";
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
