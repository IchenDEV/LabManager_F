<template>
  <div>
    <ui-textbox icon="person" floating-label label="userName"></ui-textbox>
    <ui-textbox floating-label label="password" icon="lock" type="password"></ui-textbox>
    <ui-button color="primary" icon="check" @click="LonginClicked" :loading="iswaitting">Login</ui-button>
  </div>
</template>
<script>
/* eslint-disable */
import fetch from "@/util/fetch.js";
export default {
  name: "Login",
  data() {
    return {
      iswaitting: false
    };
  },
  methods: {
    LonginClicked() {
      let con = { username: "admin", password: "123456" };
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
            url: "//localhost:8080/login/getInfo",
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
