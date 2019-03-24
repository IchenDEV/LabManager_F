<template>
  <div :class="{'center':mobileView}">
    <ui-fab color="primary" icon="menu" @click="meBTcli" style="display:inline;margin:10px;"></ui-fab>
    <transition name="slide-fade">
      <div v-if="showMenu">
        <Menu @on-select="menuChangeHandle" class="sider" style="z-index:1">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-paper"/>
              {{$t('message.contentMgr')}}
            </template>
            <menu-item name="device">{{$t('message.device')}}</menu-item>
            <menu-item name="book">{{$t('message.appointment')}}</menu-item>
            <menu-item name="department">{{$t('message.department')}}</menu-item>
            <menu-item name="project">{{$t('message.project')}}</menu-item>
            <menu-item name="group">{{$t('message.group')}}</menu-item>
            <menu-item name="lab">{{$t('message.lab')}}</menu-item>
            <menu-item name="user">{{$t('message.user')}}</menu-item>
            <menu-item name="announcement">{{$t('message.announcement')}}</menu-item>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-stats"/>
              {{$t('message.systemSet')}}
            </template>
            <menu-item name="statistics">{{$t('message.statistics')}}</menu-item>
            <menu-item name="backup">{{$t('message.backup')}}</menu-item>
            <menu-item name="log">{{$t('message.log')}}</menu-item>
          </Submenu>
        </Menu>
      </div>
    </transition>
  </div>
</template>
<script>
import router from "@/router";
export default {
  data() {
    return {
      showMenu: false
    };
  },
  computed: {
    mobileView() {
      return this.$store.state.screenWidth <= 600;
    }
  },
  methods: {
    menuChangeHandle(name) {
      if (this.mobileView == true) {
        this.showMenu = false;
      }
      router.push("../../admin/" + name);
    },
    meBTcli() {
      this.showMenu = !this.showMenu;
    }
  }
};
</script>
<style>
.sider {
  border-radius: 6px;
  background-color: rgb(255, 255, 255) !important;
  text-align: left;
  margin: 5px;
  box-shadow: 0px 1px 3px 1px rgba(0,0,0,0.14);
}
</style>

