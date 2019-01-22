<template>
  <div>
    <ui-textbox icon="person" floating-label label="userName" v-bind="username"></ui-textbox>
    <ui-textbox floating-label label="password" icon="lock" type="password" v-bind="password"></ui-textbox>
    <ui-button color="primary" icon="check" @click="LonginClicked" :loading="iswaitting">Login</ui-button>
  </div>
</template>
<script>
/* eslint-disable */
import fetch from "@/util/fetch.js";
import sha3 from "@/util/sha3.js";
export default {
  name: "Login",
  data() {
    return {
      iswaitting: false,
      username: "",
      password: ""
    };
  },
  methods: {
    LonginClicked() {
      const JsSHA = require("jssha");
      var shaObj = new JsSHA("SHA3-256", "TEXT");
      shaObj.update('123456');
      let code= shaObj.getHash("HEX");

      let con = { username: "admin", password: code };
      this.iswaitting = true;
      fetch({
        method: "Post",
        url: "//localhost:8080/login/auth",
        data: JSON.stringify(con)
      }).then(res => {
        console.log(res);
        if (res.data.code === "100") {
          alert("success");
          this.iswaitting = false;

          fetch({
            method: "Post",
            url: "//localhost:8080/login/getInfo"
          }).then(res => {
            console.log(res);
            if (res.data.code === "100") {
              alert("success");
              this.iswaitting = false;
            }
          });
        }
      });
    }
  }
};
</script>
