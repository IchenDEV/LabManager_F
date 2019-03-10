<template>
  <div :class="{'center':mobileView}">
    <ui-fab color="primary" icon="menu" @click="meBTcli" style="display:inline;margin:10px;"></ui-fab>
    <transition name="slide-fade">
      <div v-if="showMe">
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
  methods: {
    menuChangeHandle(name) {
      if (this.mobileView == true) {
        this.showMe = false;
      }
      router.push("../../admin/" + name);
    },
    meBTcli() {
      this.showMe = !this.showMe;
    }
  },
  data() {
    return {
      showMe: false
    };
  },
  computed: {
    mobileView() {
      return document.body.clientWidth <= 600;
    }
  }
};
</script>
