<template>
    <div :class="{'center':mobileView}">
      <ui-fab
        color="primary"
        icon="menu"
        @click="meBTcli"
        style="display:inline;margin:10px;"
      ></ui-fab>
      <div >
        <transition name="slide-fade">
        <Menu v-if="showMe" @on-select="menuChangeHandle" class="sider" style="z-index:1">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-paper"/>{{$t('message.contentMgr')}}
            </template>
            <menu-item name="device">{{$t('message.device')}}</menu-item>
            <menu-item name="book">{{$t('message.appointment')}}</menu-item>
            <menu-item name="department">{{$t('message.department')}}</menu-item>
            <menu-item name="project">{{$t('message.project')}}</menu-item>
            <menu-item name="group">{{$t('message.group')}}</menu-item>
            <menu-item name="lab">{{$t('message.lab')}}</menu-item>
            <menu-item name="user">{{$t('message.user')}}</menu-item>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-stats"/>{{$t('message.systemSet')}}
            </template>
              <menu-item name="statistics">{{$t('message.statistics')}}</menu-item>
              <menu-item name="backup">{{$t('message.backup')}}</menu-item>
              <menu-item name="log">{{$t('message.log')}}</menu-item>
          </Submenu>
        </Menu>
        </transition>
      </div>
    </div>
</template>
<script>
import router from "@/router";
export default {
    methods: {
    menuChangeHandle(name) {
      router.push("../../admin/" + name);
    },
    meBTcli() {
      this.showMe = !this.showMe;
    }
  },
  data() {
    return {
      screenWidth: document.body.clientWidth,
      showMe: false
    };
  },
  computed:{
    mobileView (){
      return this.screenWidth<=600;
    }
  }
}
</script>
<style>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>


