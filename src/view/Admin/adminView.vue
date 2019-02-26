<template>
  <div :class="{'col-panel':mobileView,'row-panel':!mobileView}" >
    <div :class="{'center':mobileView}">
      <ui-fab
        v-if="mobileView"
        color="primary"
        icon="menu"
        @click="meBTcli"
        style="display:inline;margin:20px;"
      ></ui-fab>
      <div >
        <Menu v-show="showMe||!mobileView" @on-select="menuChangeHandle" class="sider" style="z-index:1">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-paper"/>内容管理
            </template>
            <menu-item name="device">{{$t('message.device')}}</menu-item>
            <menu-item name="book">{{$t('message.appointment')}}</menu-item>
            <menu-item name="department">{{$t('message.department')}}</menu-item>
            <menu-item name="project">{{$t('message.product')}}</menu-item>
            <menu-item name="group">{{$t('message.group')}}</menu-item>
            <menu-item name="lab">{{$t('message.lab')}}</menu-item>
            <menu-item name="user">{{$t('message.user')}}</menu-item>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-stats"/>统计分析
            </template>
            <MenuGroup title="使用">
              <menu-item name="3-1">新增和启动</menu-item>
              <menu-item name="backup">{{$t('message.backup')}}</menu-item>
              <menu-item name="log">{{$t('message.log')}}</menu-item>
            </MenuGroup>
          </Submenu>
        </Menu>
      </div>
    </div>
    <router-view :class="{'left':!mobileView}"/>
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
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  }
};
</script>
