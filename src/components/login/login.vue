<template>
  <div>
    <ui-textbox icon="person" floating-label :label="$t('message.username')" v-model="username"></ui-textbox>
    <ui-textbox
      icon="lock"
      floating-label
      :label="$t('message.password')"
      v-model="password"
      type="password"
      @keyup.enter="LonginClicked"
    ></ui-textbox>
    <ui-button
      color="primary"
      icon="check"
      @click="LonginClicked"
      :loading="iswaitting"
      :disabled="canLogin"
    >{{$t('message.login')}}</ui-button>
  </div>
</template>
<script>
import tools from "@/util/tools.js";
import router from "@/router";
export default {
  name: "Login",
  data() {
    return {
      iswaitting: false,
      username: "",
      password: ""
    };
  },
  computed: {
    canLogin() {
      return this.username === "" || this.password === "";
    }
  },
  methods: {
    LonginClicked() {
      let code = tools.sha3(this.password);
      let con = { username: this.username, password: code };
      this.iswaitting = true;
      tools.easyfetch(tools.Api.Login, con).then(res => {
        if (res.data.info.loginCode === 0) {
          this.$Notice.success({
            title: "Welcome",
            desc: this.username
          });
          this.$store.dispatch("getInfo");
          router.push("/home");
        } else {
          this.$Notice.warning({
            title: "warning",
            desc: "Wrong Password or Username"
          });
        }
        this.iswaitting = false;
      });
    }
  }
};
</script>
