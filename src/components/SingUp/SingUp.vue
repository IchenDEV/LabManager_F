<template>
  <div>
    <ui-textbox
      v-model="username"
      icon="person"
      floating-label
      :label="$t('message.username')"
    />
    <ui-textbox
      v-model="nickname"
      icon="person"
      floating-label
      :label="$t('message.Uname')"
    />
    <ui-textbox
      v-model="password"
      icon="lock"
      floating-label
      :label="$t('message.password')"
      type="password"
    />
    <ui-textbox
      v-model="password2"
      icon="lock"
      floating-label
      :label="$t('message.password')"
      :invalid="password2!=password"
      type="password"
    />
    <ui-button
      color="primary"
      icon="check"
      :loading="iswaitting"
      :disabled="!isFullInputed"
      @click="SingUpClicked"
    >
      {{ $t('message.singup') }}
    </ui-button>
  </div>
</template>
<script>
import tools from "@/util/tools.js";
export default {
  data() {
    return {
      iswaitting: false,
      username: "",
      nickname: "",
      password: "",
      password2: "",
      buttonColor: "primary"
    };
  },
  computed: {
    isFullInputed() {
      return (
        this.password == this.password2 &&
        this.password2 != "" &&
        this.username != "" &&
        this.nickname != ""
      );
    }
  },
  methods: {
    SingUpClicked() {
      if (this.isFullInputed) {
        let con = {
          username: this.username,
          password: tools.sha3(this.password),
          nickname: this.nickname
        }
        this.iswaitting = true;
        tools.easyfetch(tools.Api.SingUp, con).then( res => {
          if (res.data.code === "100") {
            this.$Notice.success({
              title: "Sing up Success",
              desc: this.nickname
            });
          } else {
            this.$Notice.warning({
              title: "Sing up Failed",
              desc: "please try other username"
            })
          }
          this.iswaitting = false
        })
      }
    }
  }
}
</script>
