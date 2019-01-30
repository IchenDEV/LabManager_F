<template>
  <div>
    <div v-if="hasSingin">
      <div v-if="mo" class="user-panel">
        <span>
          <h3>姓名</h3>
          <p>{{nickname}}</p>
        </span>
        <span>
          <h3>id</h3>
          <p>{{id}}</p>
        </span>
        <span>
          <h3>性别</h3>
          <p>{{sex}}</p>
        </span>
        <span>
          <h3>角色</h3>
          <p>{{roleName}}</p>
        </span>
        <span>
          <h3>电话</h3>
          <p>{{phone}}</p>
        </span>
        <span>
          <h3>邮箱</h3>
          <p>{{email}}</p>
        </span>
        <span>
          <h3>地址</h3>
          <p>{{address}}</p>
        </span>
      </div>
      <div v-else class="user-panel">
        <ui-textbox
          class="user-itme"
          icon="person"
          :invalid="nickname.length === 0"
          floating-label
          label="姓名"
          v-model="nickname"
          required
          error="This field is required"
        ></ui-textbox>
        <ui-select
          class="user-itme"
          icon="person"
          floating-label
          label="性别"
          :options="sexString"
          v-model="sex"
        ></ui-select>
        <ui-textbox class="user-itme" icon="phone" floating-label label="电话" v-model="phone"></ui-textbox>
        <ui-textbox
          class="user-itme"
          icon="mail"
          :invalid="ismail === false&&email.length>0"
          floating-label
          label="邮箱"
          v-model="email"
          error="错误的邮箱格式"
        ></ui-textbox>
        <ui-textbox class="user-itme" icon="home" floating-label label="地址" v-model="address"></ui-textbox>
      </div>
      <ui-button color="primary" icon="adjust" @click="logouthandle" :loading="iswaitting">登出</ui-button>
      <ui-button
        v-if="mo"
        color="primary"
        icon="adjust"
        @click="mohandle"
        :loading="iswaitting"
      >{{moString}}</ui-button>
      <span v-else>
        <ui-button color="primary" icon="update" @click="updateinfo" :loading="iswaitting">更新</ui-button>
        <ui-button
          color="primary"
          icon="cancel"
          @click="mohandle"
          :loading="iswaitting"
        >{{moString}}</ui-button>
      </span>
    </div>
    <div v-else>
      <ui-button color="primary" icon="adjust" @click="loginhandle">请登录</ui-button>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import VueNotifications from "vue-notifications";
import fetch from "@/util/fetch.js";
import router from "@/router";
import stringCK from "@/util/stringCK.js";
export default {
  data() {
    return {
      iswaitting: false,
      moString: "修改",
      mo: true,
      username: "",
      nickname: "",
      sex: "",
      address: "",
      phone: "",
      email: "",
      roleName: "",
      id: "",
      sexString: ["未知", "男", "女", "其他"]
    };
  },
  computed: {
    ismail() {
      return stringCK.isEmail(this.email)
    },
    hasSingin (){return this.$store.state.hasSingin}
  },
  methods: {
    getinfo() {
      if (this.nickname === "") {
        this.iswaitting = true;
        var that = this;
        fetch({
          method: "Post",
          url: this.$store.state.host + "/login/getInfo"
        })
          .then(res => {
            console.log(res);
            if (res.data.code === "100") {
              this.nickname = res.data.info.userPermission.nickname;
              this.phone = res.data.info.userPermission.phone;
              this.address = res.data.info.userPermission.address;
              this.email = res.data.info.userPermission.email;
              this.sex = this.sexString[res.data.info.userPermission.sex];
              this.roleName = res.data.info.userPermission.roleName;
              this.id = res.data.info.userPermission.userId;
              this.$store.state.currentUser.id = this.id;
              this.showSuccessMsg({ title: this.nickname });
            } else {
              this.showErrorMsg({ title: res.data.msg });
            }
            this.iswaitting = false;
          })
          .catch(function(err) {
            console.log(err);
            that.showErrorMsg();
          });
      } else {
      }
    },
    updateinfo() {
      this.iswaitting = true;
      let con = {
        nickname: this.nickname,
        phone: this.phone,
        sex: this.sexString.indexOf(this.sex),
        address: this.address,
        email: this.email
      };
      fetch({
        method: "Post",
        url: this.$store.state.host + "/login/updateInfo",
        data: JSON.stringify(con)
      })
        .then(res => {
          console.log(res);
          if (res.data.code === "100") {
            this.showSuccessMsg({ title: this.nickname });
            this.moString = "修改";
            this.mo = true;
          } else {
            this.showErrorMsg({ title: res.data.msg });
          }
          this.iswaitting = false;
        })
        .catch(function(err) {
          console.log(err);
          this.showErrorMsg();
        });
    },
    mohandle() {
      if (this.mo) {
        this.moString = "取消";
      } else {
        this.getinfo();
        this.moString = "修改";
      }
      this.mo = !this.mo;
    },
    loginhandle() {
      router.push("/login");
    },
    logouthandle() {
      this.iswaitting = true;
      var that = this;
      fetch({
        method: "Post",
        url: this.$store.state.host + "/login/logout"
      })
        .then(res => {
          console.log(res);
          if (res.data.code === "100") {
            this.showSuccessMsg({ title: this.nickname });
            this.$store.state.hasSingin = false;
          } else {
            this.showErrorMsg({ title: res.data.msg });
          }
          this.iswaitting = false;
        })
        .catch(function(err) {
          console.log(err);
          that.showErrorMsg();
        });
    }
  },
  mounted() {
    this.getinfo();
  },
  notifications: {
    showSuccessMsg: {
      type: VueNotifications.types.success,
      title: "Hello " + this.username,
      message: "成功"
    },
    showErrorMsg: {
      type: VueNotifications.types.error,
      title: "Wow-wow",
      message: "错误"
    }
  }
};
</script>
<style>
.user-panel {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.user-panel > span {
  padding: 10px;
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
  width: 300px; /* 让过渡表现良好。（从/到"width:auto"的过渡
                      至少在 Gecko 和 Webkit 上是有 bug 的。
                      更多信息参见 http://bugzil.la/731886 ） */

  -webkit-transition: width 0.7s ease-out;
  transition: width 0.7s ease-out;
}

.user-itme {
  padding: 10px;
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
  min-width: 120px;
  max-width: 350px;
  width: 250px; /* 让过渡表现良好。（从/到"width:auto"的过渡
                      至少在 Gecko 和 Webkit 上是有 bug 的。
                      更多信息参见 http://bugzil.la/731886 ） */

  -webkit-transition: width 0.7s ease-out;
  transition: width 0.7s ease-out;
}
</style>

