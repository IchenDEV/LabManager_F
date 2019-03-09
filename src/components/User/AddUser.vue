<template>
  <div>
    <h2>{{ $t('message.create') }} {{ $t('message.user') }}</h2>
    <ui-textbox
      v-model="con.username"
      icon="person"
      floating-label
      :label="$t('message.username')"
      autocomplete="off"
    />
    <ui-textbox
      v-model="con.password"
      icon="lock"
      floating-label
      :label="$t('message.password')"
      type="password"
      placeholder="password"
      autocomplete="off"
    />
    <ui-textbox
      v-model="con.nickname"
      icon="lock"
      floating-label
      :label="$t('message.Uname')"
      autocomplete="off"
    />
    <ui-select
      v-model="role"
      icon="person"
      floating-label
      :label="$t('message.role')"
      :options="roleString"
    />
    <ui-button
      color="primary"
      icon="check"
      :loading="iswaitting"
      :disabled="disable"
      @click="addClicked"
    >
      {{ $t('message.create') }}
    </ui-button>
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
      this.iswaitting = true;
      this.con.password = tools.sha3(this.con.password);
      this.con.roleId = this.roleString.indexOf(this.role) + 1;
      tools.easyfetch(tools.Api.AddUser, this.con).then(() => {
        this.iswaitting = false;
        this.$emit("added");
      });
    }
  }
};
</script>
