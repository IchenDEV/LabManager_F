<template>
  <div class="header">
    <div class="person-nav">
      <ou-button v-if="$store.state.hasSingin" @click="showPanel=!showPanel">
        <i class="ms-Icon ms-Icon--CreateMailRule" aria-hidden="true"></i>
        通知中心
      </ou-button>
      <ou-panel
        v-if="$store.state.hasSingin"
        icon="CreateMailRule"
        title="通知中心"
        size="xl"
        v-model="showPanel"
      >
        <current-msg-box/>
      </ou-panel>
      <ou-button
        v-if="!$store.state.hasSingin"
        type="hero"
        icon="AddFriend"
        @click="loginhandle"
      >{{$t("message.pleaseLogin")}}</ou-button>
      <ou-callout v-else type="OOBE" :title="$store.state.currentUser.nickname">
        <div slot="actions">
          <ui-switch v-model="$store.state.isListMode">列表模式</ui-switch>
          <ou-button type="primary" @click="my">More</ou-button>
        </div>
        <div slot="content" class="flex-panel">
          <span>
            <h3>{{$t("message.Uname")}}</h3>
            <p>{{$store.state.currentUser.nickname}}</p>
          </span>
          <span>
            <h3>id</h3>
            <p>{{$store.state.currentUser.id}}</p>
          </span>
          <span>
            <h3>{{$t("message.reputation")}}</h3>
            <p>{{$store.state.currentUser.reputation}}</p>
          </span>
        </div>
        <ou-button>
          <i class="ms-Icon ms-Icon--AccountManagement" aria-hidden="true"></i>
          {{$store.state.currentUser.nickname}}
        </ou-button>
      </ou-callout>
    </div>
    <img
      style="margin-top:15px;margin-button:5px;"
      width="30"
      height="40"
      class="center"
      slot="icon"
      src="logo.png"
      alt="logo"
    >
    <nav class="nav-bar">
      <ul style="list-style:none;">
        <li :class="{'b_active':$store.state.path=='homeView'}">
          <router-link to="/home">Home</router-link>
        </li>
        <li :class="{'b_active':$store.state.path=='calendarView'}" v-if="$store.state.hasSingin">
          <router-link to="/calendar">{{$t('message.appointment')}}</router-link>
        </li>
        <li :class="{'b_active':$store.state.path=='bookView'}" v-if="$store.state.hasSingin">
          <router-link to="/book">{{$t('message.appointment')}}</router-link>
        </li>
        <li :class="{'b_active':$store.state.path=='myView'}" v-if="$store.state.hasSingin">
          <router-link to="/my">{{$t('message.my')}}</router-link>
        </li>
        <li
          :class="{'b_active':$store.state.path=='adminView'}"
          v-if="isAdmin&&$store.state.hasSingin"
        >
          <router-link to="/admin">{{$t('message.admin')}}</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
/* eslint-disable */
import currentMsgBox from "@/components/msg/currentMsgBox";
import router from "@/router";
export default {
  components: { currentMsgBox },
  computed: {
    isAdmin() {
      return this.$store.state.isAdmin;
    }
  },
  data() {
    return {
      showPanel: false
    };
  },
  methods: {
    loginhandle() {
      router.push("../login");
    },
    my() {
      router.push("../../my");
    }
  }
};
</script>
<style>
.person-nav {
  position: absolute;
  right: 20px;
  top: 20px;
}
.nav-bar ul {
  list-style: none;
  margin: 1px 0 0;
  white-space: nowrap;
  -ms-overflow-style: none;
  overflow: auto;
  text-align: left;
  height: 100%;
  padding-right: 50px;
  margin-left: 10%;
}
.nav-bar li {
  text-transform: uppercase;
  font-size: 12px;
  margin: 0 12px;
  display: inline-block;
  padding: 0;
  position: relative;
}
.nav-bar {
  border-bottom: 1px solid #ddd;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -webkit-flex: 1 0 0;
  flex: 1 0 0;
  line-height: 36px;
  margin-bottom: 0px;
  overflow: hidden;
  margin-right: 140px;
}
.nav-bar li a {
  color: #444;
  font-size: 1.2rem;
}
.b_active::after {
  border-bottom: 3px solid #00809d;
  content: " ";
  position: absolute;
  bottom: 0px;
  left: -4px;
  right: -4px;
}
.b_active {
  font-weight: bold;
}
.header {
  background-color: #f0f0f0;
  margin-bottom: 25px;
}
</style>
