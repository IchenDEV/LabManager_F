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
            <menu-item name="device">设备管理</menu-item>
            <menu-item name="book">预定管理</menu-item>
            <menu-item name="department">部门管理</menu-item>
            <menu-item name="project">项目管理</menu-item>
            <menu-item name="group">项目组管理</menu-item>
            <menu-item name="lab">实验室管理</menu-item>
            <menu-item name="user">用户管理</menu-item>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-stats"/>统计分析
            </template>
            <MenuGroup title="使用">
              <menu-item name="3-1">新增和启动</menu-item>
              <menu-item name="backup">备份</menu-item>
              <menu-item name="log">日志</menu-item>
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
<style>
.col-panel {
    background-color: white;
    display: flex;
    flex-direction: column;
    z-index: 1;
}
.sider {
  background-color: white;
  text-align: left;
}
.row-panel {
      background-color: white;
      display: flex;
      flex-direction: row;
      z-index: 1;
}
.left{
  margin-left: 3rem;
}
</style>
