<template>
  <Layout class="flex-panel">
    <Sider class="sider">
    <Menu @on-select="menuChangeHandle">
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
    <Content>
    <router-view/>
    </Content>
  </Layout>
</template>
<script>
import router from '@/router'
export default {
  methods: {
    menuChangeHandle (name) {
      router.push('../admin/' + name)
    }
  }
}
</script>
<style>
.flex-panel {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: white;
}
.sider{
  background-color: white;
  text-align: left;
}
.flex-panel > div {
  padding: 10px;
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
  width: 300px; /* 让过渡表现良好。（从/到'width:auto'的过渡
                      至少在 Gecko 和 Webkit 上是有 bug 的。
                      更多信息参见 http://bugzil.la/731886 ） */

  -webkit-transition: width 0.7s ease-out;
  transition: width 0.7s ease-out;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  margin-top: 0.5rem
}
</style>
