<template>
  <div>
    <language-switch></language-switch>
    <ou-spinner v-if="id==null||id==''" label="Loading..." type="large"/>
    <div v-if="hasSingin">
      <div v-if="mo" class="user-panel">
        <span>
          <h3>{{$t("message.Uname")}}</h3>
          <p>{{nickname}}</p>
        </span>
        <span>
          <h3>id</h3>
          <p>{{id}}</p>
        </span>
        <span>
          <h3>{{$t("message.sex")}}</h3>
          <p>{{sex}}</p>
        </span>
        <span>
          <h3>{{$t("message.reputation")}}</h3>
          <p>{{reputation}}</p>
        </span>
        <span>
          <h3>{{$t("message.role")}}</h3>
          <p>{{roleName}}</p>
        </span>
        <span v-if="!simple">
          <h3>{{$t("message.phone")}}</h3>
          <p>{{phone}}</p>
        </span>
        <span v-if="!simple">
          <h3>{{$t("message.email")}}</h3>
          <span style="word-wrap:break-word;">{{email}}</span>
        </span>
        <span v-if="!simple">
          <h3>{{$t("message.address")}}</h3>
          <p>{{address}}</p>
        </span>
        <span>
          <h3>{{$t("message.department")}}</h3>
          <router-link
            v-for="(item,index) in dpinfo.list"
            :key="index"
            :to=" '/department/'+item.departmentId"
          >{{item.departmentName}}</router-link>
          <ou-spinner v-if="dpinfo.list==null||dpinfo.list==''" label="Loading..." type="large"/>
        </span>
        <span>
          <h3>{{$t("message.group")}}</h3>
          <router-link
            v-for="(item,index) in gpinfo.list"
            :key="index"
            :to=" '/group/'+item.groupId"
          >{{item.groupName}}</router-link>
          <ou-spinner v-if="dpinfo.list==null||dpinfo.list==''" label="Loading..." type="large"/>
        </span>
      </div>
      <div v-else class="user-panel">
        <ui-textbox
          class="user-itme"
          icon="person"
          :invalid="nickname.length === 0"
          floating-label
          :label="$t('message.Uname')"
          v-model="nickname"
          required
          error="This field is required"
        ></ui-textbox>
        <ui-select
          class="user-itme"
          icon="person"
          floating-label
          :label="$t('message.sex')"
          :options="sexString"
          v-model="sex"
        ></ui-select>
        <ui-textbox
          class="user-itme"
          icon="phone"
          floating-label
          :label="$t('message.phone')"
          v-model="phone"
        ></ui-textbox>
        <ui-textbox
          class="user-itme"
          icon="mail"
          style="word-wrap:anywhere;"
          :invalid="ismail === false&&email.length>0"
          floating-label
          :label="$t('message.email')"
          v-model="email"
          :error="$t('message.wrongEmail')"
        ></ui-textbox>
        <ui-textbox
          class="user-itme"
          icon="home"
          floating-label
          :label="$t('message.address')"
          v-model="address"
        ></ui-textbox>
      </div>
      <ui-button
        v-if="!simple"
        color="primary"
        icon="exit_to_app"
        @click="logouthandle"
        :loading="iswaitting"
      >{{$t("message.logout")}}</ui-button>
      <ui-button
        v-if="mo&&!simple"
        color="primary"
        icon="adjust"
        @click="mohandle"
        :loading="iswaitting"
      >{{moString}}</ui-button>
      <ui-button
        v-if="!simple"
        color="primary"
        icon="fingerprint"
        @click="passwordhandle"
        :loading="iswaitting"
      >{{$t("message.modifyPass")}}</ui-button>
      <span v-if="!mo">
        <ui-button
          v-if="!simple"
          color="primary"
          icon="update"
          @click="updateinfo"
          :loading="iswaitting"
        >{{$t("message.update")}}</ui-button>
        <ui-button
          v-if="!simple"
          color="primary"
          icon="cancel"
          @click="mohandle"
          :loading="iswaitting"
        >{{moString}}</ui-button>
      </span>
    </div>
    <div v-else>
      <ui-button color="primary" icon="adjust" @click="loginhandle">{{$t("message.pleaseLogin")}}</ui-button>
    </div>
    <ui-modal ref="passmodal" :title="$t('message.modifyPass')" @close="modalClose">
      <update-current-password @close="closepass"></update-current-password>
    </ui-modal>
  </div>
</template>
<script>
import languageSwitch from "@/components/language/languageSwitch";
import tools from "@/util/tools.js";
import router from "@/router";
import UpdateCurrentPassword from "@/components/currentUserBox/updateCurrentPassword";
export default {
  components: { UpdateCurrentPassword, languageSwitch },
  props: { simple: { default: false } },
  data() {
    return {
      iswaitting: false,
      moString: this.$t("message.modify"),
      mo: true,
      username: "",
      nickname: "",
      sex: "",
      address: "",
      phone: "",
      email: "",
      roleName: "",
      reputation: "",
      id: "",
      sexString: [
        this.$t("message.unknow"),
        this.$t("message.male"),
        this.$t("message.female"),
        this.$t("message.other")
      ],
      dpinfo: {},
      gpinfo: {}
    };
  },
  computed: {
    ismail() {
      return tools.isEmail(this.email);
    },
    hasSingin() {
      return this.$store.state.hasSingin;
    }
  },
  methods: {
    getinfo() {
      if (this.$store.state.hasSingin === true) {
        this.$Loading.start();
        tools
          .easyfetch(tools.Api.UserInfo, null)
          .then(res => {
            if (res.data.code === "100") {
              this.nickname = res.data.info.userPermission.nickname;
              this.phone = res.data.info.userPermission.phone;
              this.address = res.data.info.userPermission.address;
              this.email = res.data.info.userPermission.email;
              this.sex = this.sexString[res.data.info.userPermission.sex];
              this.roleName = res.data.info.userPermission.roleName;
              this.id = res.data.info.userPermission.id;
              this.reputation = res.data.info.userPermission.reputation;
              this.$store.state.currentUser.id = this.id;
              this.$store.state.currentUser.reputation = this.reputation;
            }
            this.getDpinfo();
            this.getGpinfo();
            this.$Loading.finish();
          })
          .catch();
      }
    },
    getDpinfo() {
      let conp = { id: this.$store.state.currentUser.id };
      this.$Loading.start();
      tools.easyfetch(tools.Api.ListUserDepartment, conp).then(res => {
        if (res.data.code === "100") {
          this.dpinfo = res.data.info;
        }
        this.$Loading.finish();
      });
    },
    getGpinfo() {
      let conp = { id: this.$store.state.currentUser.id };
      this.$Loading.start();
      tools.easyfetch(tools.Api.ListUserGroup, conp).then(res => {
        if (res.data.code === "100") {
          this.gpinfo = res.data.info;
        }
        this.$Loading.finish();
      });
    },
    updateinfo() {
      this.$Loading.start();
      let con = {
        nickname: this.nickname,
        phone: this.phone,
        sex: this.sexString.indexOf(this.sex),
        address: this.address,
        email: this.email
      };
      tools.easyfetch(tools.Api.UpdateInfo, con).then(res => {
        if (res.data.code === "100") {
          this.$Notice.success({
            title: "Success",
            desc: this.nickname
          });
          this.moString = this.$t("message.modify");
          this.mo = true;
        }
        this.$Loading.finish();
        this.$Notice.success({
          title: "Success"
        });
      });
    },
    mohandle() {
      if (this.mo) {
        this.moString = this.$t("message.cancel");
      } else {
        this.getinfo();
        this.moString = this.$t("message.modify");
      }
      this.mo = !this.mo;
    },
    closepass() {
      this.$store.state.modal = false;
      this.$refs["passmodal"].close();
    },
    passwordhandle() {
      this.$store.state.modal = true;
      this.$refs["passmodal"].open();
    },
    loginhandle() {
      router.push("../login");
    },
    logouthandle() {
      this.$Loading.start();
      tools.easyfetch(tools.Api.Logout, null).then(res => {
        if (res.data.code === "100") {
          this.$store.commit("cleanInfo");
          location.reload();
        } else {
          this.$Notice.success({
            title: res.data.msg
          });
        }
        this.$Loading.finish();
        this.$Notice.success({
          title: "Success"
        });
      });
    },
    modalClose() {
      this.$store.state.modal = false;
    }
  },
  mounted() {
    this.getinfo();
  },
  watch: {
    hasSingin() {
      this.getinfo();
    }
  }
};
</script>
<style>
.user-panel {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 1.1rem;
}
.user-panel > span {
  margin: 10px;
  padding: 10px;
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
  width: 100px; /* 让过渡表现良好。（从/到'width:auto'的过渡
                      至少在 Gecko 和 Webkit 上是有 bug 的。
                      更多信息参见 http://bugzil.la/731886 ） */

  -webkit-transition: width 0.7s ease-out;
  transition: width 0.7s ease-out;
}
</style>
