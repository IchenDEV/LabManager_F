<template>
  <div>
    <div v-if="hasSingin">
      <div>
        <ui-textbox
          icon="lock"
          floating-label
          :label="$t('message.password')"
          v-model="password"
          type="password"
        ></ui-textbox>
      </div>
      <ui-button
        color="primary"
        icon="fingerprint"
        @click="mohandle"
        :loading="iswaitting"
      >{{$t('message.modify')}} {{$t('message.password')}}</ui-button>
    </div>
  </div>
</template>
<script>
import tools from "@/util/tools.js";
export default {
  data() {
    return {
      iswaitting: false,
      password: ""
    };
  },
  computed: {
    hasSingin() {
      return this.$store.state.hasSingin;
    },
    buttonEnable() {
      return (
        this.password !== "" &&
        this.password !== null &&
        this.$store.state.hasSingin === true
      );
    }
  },
  methods: {
    mohandle() {
      if (
        this.password !== "" &&
        this.password !== null &&
        this.$store.state.hasSingin === true
      ) {
        const JsSHA = require("jssha");
        var shaObj = new JsSHA("SHA3-256", "TEXT");
        shaObj.update(this.password);
        let code = shaObj.getHash("HEX");
        let data = {
          username: this.$store.state.currentUser.username,
          password: code
        };
        tools
          .easyfetch(tools.Api.UpdatePassword, data)
          .then(res => {
            if (res.data.code === "100") {
              this.$emit("close");
            }
            this.$Loading.finish();
            this.$Notice.success({
              title: "Success"
            });
          })
          .catch();
      }
    }
  }
};
</script>
