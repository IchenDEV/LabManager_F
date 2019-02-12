<template>
  <Layout class="flex-panel" style="background-color: white;">
    <Sider
      v-if="screenWidth>=600"
      class="sider"
      style="background-color: white;width: 400px;max-width:400px;"
    >
      <Menu @on-select="menuChangeHandle" style="max-width:400px;">
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
            <menu-item name="3-2">活跃分析</menu-item>
            <menu-item name="log">日志</menu-item>
          </MenuGroup>
        </Submenu>
      </Menu>
    </Sider>
    <div v-else style="margin-left: auto;margin-right:auto;display:inline;">
      <ui-fab
        color="primary"
        icon="menu"
        @click="meBTcli"
        style="display:inline;margin:20px;"
      ></ui-fab>
      <Menu v-if="showMe" @on-select="menuChangeHandle" style="width:76%;">
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
            <menu-item name="3-2">活跃分析</menu-item>
            <menu-item name="log">日志</menu-item>
          </MenuGroup>
        </Submenu>
      </Menu>
    </div>
    <Content>
      <router-view/>
    </Content>
  </Layout>
</template>
<script>
import router from "@/router";
export default {
  methods: {
    menuChangeHandle(name) {
      router.push("../admin/" + name);
    },
    meBTcli() {
      this.showMe=!this.showMe
    }
  },
  data() {
    return {
      screenWidth: document.body.clientWidth,
      showMe: false
    };
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
.sider {
  background-color: white;
  text-align: left;
}
</style>
