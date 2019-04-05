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
            <menu-item name="device">
              <i class="ms-Icon ms-Icon--Devices4" aria-hidden="true"></i>
              {{$t('message.device')}}
            </menu-item>
            <menu-item name="book">
              <i class="ms-Icon ms-Icon--TaskGroup" aria-hidden="true"></i>
              {{$t('message.appointment')}}
            </menu-item>
            <menu-item name="department">
              <i class="ms-Icon ms-Icon--EMI" aria-hidden="true"></i>
              {{$t('message.department')}}
            </menu-item>
            <menu-item name="project">
              <i class="ms-Icon ms-Icon--ExternalTFVC" aria-hidden="true"></i>
              {{$t('message.project')}}
            </menu-item>
            <menu-item name="group">
              <i class="ms-Icon ms-Icon--WorkforceManagement" aria-hidden="true"></i>
              {{$t('message.group')}}
            </menu-item>
            <menu-item name="lab">
              <i class="ms-Icon ms-Icon--TestBeaker" aria-hidden="true"></i>
              {{$t('message.lab')}}
            </menu-item>
            <menu-item name="user">
              <i class="ms-Icon ms-Icon--UserEvent" aria-hidden="true"></i>
              {{$t('message.user')}}
            </menu-item>
            <menu-item name="announcement">
              <i class="ms-Icon ms-Icon--FileComment" aria-hidden="true"></i>
              {{$t('message.announcement')}}
            </menu-item>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-stats"/>
              {{$t('message.systemSet')}}
            </template>
            <menu-item name="statistics">
              <i class="ms-Icon ms-Icon--AnalyticsReport" aria-hidden="true"></i>
              {{$t('message.statistics')}}
            </menu-item>
            <menu-item name="backup">
              <i class="ms-Icon ms-Icon--WorkFlow" aria-hidden="true"></i>
              {{$t('message.backup')}}
            </menu-item>
            <menu-item name="log">
              <i class="ms-Icon ms-Icon--Articles" aria-hidden="true"></i>
              {{$t('message.log')}}
            </menu-item>
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
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.14);
}
</style>

