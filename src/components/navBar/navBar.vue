<template>
  <div class="header">
    <div class="person-nav">
      <ui-button
        v-if="!$store.state.hasSingin"
        color="primary"
        icon="adjust"
        @click="loginhandle"
      >{{$t("message.pleaseLogin")}}</ui-button>
      <router-link v-else to="/my">{{$store.state.currentUser.nickname}}</router-link>
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
import router from "@/router";
export default {
  computed: {
    isAdmin() {
      return this.$store.state.isAdmin;
    }
  },
  methods: {
    loginhandle() {
      router.push("../login");
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
  margin-bottom: 15px;
}
</style>
