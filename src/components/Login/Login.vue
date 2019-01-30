<template>
  <div>
    <ui-textbox icon="person" floating-label label="用户名" v-model="username"></ui-textbox>
    <ui-textbox icon="lock" floating-label label="密码" v-model="password" type="password"></ui-textbox>
    <ui-button color="primary" icon="check" @click="LonginClicked" :loading="iswaitting">登录</ui-button>
  </div>
</template>
<script>
/* eslint-disable */
import VueNotifications from "vue-notifications";
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
      shaObj.update(this.password);
      let code = shaObj.getHash("HEX");
      let con = { username: this.username, password: code };
      this.iswaitting = true;
      fetch({
        method: "Post",
        url: "//localhost:8080/login/auth",
        data: JSON.stringify(con)
      })
        .then(res => {
          console.log(res);
          if (res.data.info.loginCode === 0) {
            this.showSuccessMsg({ title: "Welcome " + this.username });

            fetch({
              method: "Post",
              url: "//localhost:8080/login/getInfo"
            })
              .then(res => {
                console.log(res);
                if (res.data.code === "100") {
                  this.$store.state.currentUser.nickname = res.data.info.userPermission.nickname;
                  this.$store.state.currentUser.username = this.username;
                  this.$store.state.currentUser.id = res.data.info.userPermission.userId;
                  this.$store.state.hasSingin=true;
                  this.showSuccessMsg({ title: this.nickname });
                } else {
                  this.showErrorMsg({ title: res.data.msg });
                }
                this.iswaitting = false;
              })
              .catch(function(err) {
                console.log(err);
                this.showErrorMsg();
              });
          } else {
            this.showWarnMsg();
          }
          this.iswaitting = false;
        })
        .catch(function(err) {
          console.log(err);
          this.showErrorMsg();
        });
    }
  },
  notifications: {
    showSuccessMsg: {
      type: VueNotifications.types.success,
      title: "Hello " + this.username,
      message: "登录成功"
    },
    showWarnMsg: {
      type: VueNotifications.types.warn,
      title: "登录失败",
      message: "可能你输入了不正确的密码或者用户名"
    },
    showErrorMsg: {
      type: VueNotifications.types.error,
      title: "Wow-wow",
      message: "That's the error"
    }
  }
};
</script>
