<template>
  <div>
    <h2>{{$t('message.create')}} {{$t('message.user')}}</h2>
    <ui-textbox
      icon="person"
      floating-label
      :label="$t('message.username')"
      v-model="con.username"
      autocomplete="off"
    ></ui-textbox>
    <ui-textbox
      icon="lock"
      floating-label
      :label="$t('message.password')"
      type="password"
      placeholder="password"
      v-model="con.password"
      autocomplete="off"
    ></ui-textbox>
    <ui-textbox
      icon="lock"
      floating-label
      :label="$t('message.Uname')"
      v-model="con.nickname"
      autocomplete="off"
    ></ui-textbox>
    <ui-select
      icon="person"
      floating-label
      :label="$t('message.role')"
      :options="roleString"
      v-model="role"
    ></ui-select>
    <ui-button
      color="primary"
      icon="check"
      @click="addClicked"
      :loading="iswaitting"
      :disabled="disable"
    >{{$t('message.create')}}</ui-button>
  </div>
</template>
<script>
import tools from "@/util/tools.js";
export default {
  data() {
    return {
      roleString: [
        this.$t("message.superAdmin"),
        this.$t("message.admin"),
        this.$t("message.user")
      ],
      role: 2,
      con: {
        username: "",
        password: "",
        nickname: "",
        roleId: 3,
        status: 1
      },
      iswaitting: false
    };
  },
  computed: {
    disable() {
      return (
        this.con.username == "" ||
        this.con.password == "" ||
        this.con.nickname == ""
      );
    }
  },
  methods: {
    addClicked() {
      this.$Loading.start();
      this.con.password = tools.sha3(this.con.password);
      this.con.roleId = this.roleString.indexOf(this.role) + 1;
      tools.easyfetch(tools.Api.AddUser, this.con).then(() => {
        this.$Loading.finish();
        this.$emit("added");
      });
    }
  }
};
</script>
