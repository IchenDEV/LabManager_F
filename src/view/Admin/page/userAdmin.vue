<template>
  <div>
    <Card>
      <h2>修改用户信息</h2>
      <div class="flex-panel">
        <ui-textbox icon="phone" floating-label label="名称" v-model="item.nickname"></ui-textbox>
        <ui-textbox icon="phone" floating-label label="电话" v-model="item.phone"></ui-textbox>
        <ui-textbox icon="phone" floating-label label="地址" v-model="item.address"></ui-textbox>
        <ui-select icon="person" floating-label label="性别" :options="sexString" v-model="sex"></ui-select>
        <ui-select icon="person" floating-label label="角色" :options="roleString" v-model="role"></ui-select>
        <ui-textbox
          icon="mail"
          :invalid="ismail === false"
          floating-label
          label="邮箱"
          v-model="item.email"
          error="错误的邮箱格式"
        ></ui-textbox>
      </div>
      <ui-button color="primary" icon="update" @click="updatePassword" :loading="iswaitting">修改密码</ui-button>
      <ui-button v-if="item.roleId===1" color="primary" icon="update" @click="updateSuperPassword" :loading="iswaitting">修改超级密码</ui-button>
      <ui-button color="primary" icon="update" @click="inputSuper" :loading="iswaitting">更新</ui-button>
    </Card>
    <ui-modal ref="SuperPasswordmModal" title="请输入超级管理员密码">
      <p>如果修改了当前管理员超级密码请输入旧的超级管理员密码</p>
      <ui-textbox
        icon="phone"
        floating-label
        label="超级管理员密码"
        type="password"
        v-model="item.adminSuperPassword"
      ></ui-textbox>
      <ui-button color="primary" icon="update" @click="updateClick" :loading="iswaitting">更新</ui-button>
    </ui-modal>
    <ui-modal ref="PasswordmModal" title="请输入新密码">
      <ui-textbox icon="lock" floating-label label="密码" type="password" v-model="item.password"></ui-textbox>
    <ui-button color="primary" icon="update" @click="doneClick" :loading="iswaitting">完成</ui-button>
    </ui-modal>
    <ui-modal ref="PasswordmModal2" title="请输入新超级密码">
      <ui-textbox
        icon="lock"
        floating-label
        label="密码"
        type="password"
        v-model="item.superPassword"
      ></ui-textbox>
      <ui-button color="primary" icon="update" @click="doneClick" :loading="iswaitting">完成</ui-button>
    </ui-modal>
  </div>
</template>
<script>
import fetch from "@/util/fetch.js";
import stringCK from "@/util/stringCK.js";
export default {
  data() {
    return {
      search: { id: this.$route.params.id, pageRow: 1 },
      item: {},
      iswaitting: false,
      sexString: ["未知", "男", "女", "其他"],
      sex: 0,
      roleString: ["超级管理员", "管理员", "用户"],
      role: 2
    };
  },
  computed: {
    ismail() {
      return stringCK.isEmail(this.item.email);
    },
    hasSingin() {
      return this.$store.state.hasSingin;
    }
  },
  methods: {
    getUserInfo() {
      for (var key in this.search) {
        if (this.search[key] === null || this.search[key] === "") {
          delete this.search[key];
        }
      }
      fetch({
        method: "Post",
        url: this.$store.state.host + "/user/list",
        data: JSON.stringify(this.search)
      })
        .then(res => {
          this.item = res.data.info.list[0];
          this.sex = this.sexString[this.item.sex];
          this.role = this.roleString[this.item.roleId - 1];
        })
        .catch();
    },
    inputSuper() {
      this.$refs["SuperPasswordmModal"].open();
    },
    updatePassword() {
      this.$refs["PasswordmModal"].open();
    },
    updateSuperPassword() {
      this.$refs["PasswordmModal2"].open();
    },
    doneClick () {
      this.$refs["PasswordmModal2"].close();
      this.$refs["PasswordmModal"].close();
    },
    updateClick() {

      const JsSHA = require("jssha");
      var shaObj = new JsSHA("SHA3-256", "TEXT");
      shaObj.update(this.item.adminSuperPassword.toString());
      let code = shaObj.getHash("HEX");
      this.item.adminSuperPassword = code;

      this.iswaitting = true;
      this.item.sex = this.sexString.indexOf(this.sex);
      this.item.roleId = this.roleString.indexOf(this.role)+1;
      this.item.adminId = this.$store.state.currentUser.id;

      if (this.item.password != null && this.item.password !='') {
        var shaObj2 = new JsSHA("SHA3-256", "TEXT");
        shaObj2.update(this.item.password);
        let code2 = shaObj2.getHash("HEX");
        this.item.password = code2;
      }

      if (this.item.superPassword != null && this.item.superPassword != '') {
        var shaObj3 = new JsSHA("SHA3-256", "TEXT");
        shaObj3.update(this.item.superPassword);
        let code3 = shaObj3.getHash("HEX");
        this.item.superPassword = code3;
      }

      delete this.item["permissionList"];
      for (var key in this.item) {
        if (this.item[key] === null || this.item[key] === "") {
          delete this.item[key];
        }
      }
      fetch({
        method: "Post",
        url: this.$store.state.host + "/user/updateUser",
        data: JSON.stringify(this.item)
      })
        .then(()=>{this.iswaitting = false;this.getUserInfo();this.$refs["SuperPasswordmModal"].close();})
        .catch();
    }
  },
  mounted() {
    this.getUserInfo();
  }
};
</script>
