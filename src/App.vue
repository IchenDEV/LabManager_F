<template>
  <div id="app">
    <NavBar></NavBar>
    <header style="height:80px;"></header>
    <router-view v-if="isRouterAlive"/>
    <BackTop></BackTop>
    <my-footer></my-footer>
  </div>
</template>
<script>
import NavBar from "./components/NavBar/NavBar";
import myFooter from "./components/Footer/Footer";
export default {
  name: "App",
  components: { NavBar, myFooter },
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    }
  },
  mounted() {
    /* eslint-disable */
    if (window.Notification && Notification.permission !== "granted") {
      Notification.requestPermission(function(status) {
        if (Notification.permission !== status) {
          Notification.permission = status;
        }
      });
    }
    if (window.Notification && Notification.permission === "granted") {
      var n = new Notification("北京第三交通委提醒您：", {
        body: "道路千万条，安全第一条\r\n行车不规范，亲人两行泪",
        icon: "safe.jpg"
      });
    } else if (window.Notification && Notification.permission !== "denied") {
      Notification.requestPermission(function(status) {
        if (Notification.permission !== status) {
          Notification.permission = status;
        }
        // 如果用户同意了
        if (status === "granted") {
          var n = new Notification("北京第三交通委提醒您：", {
            body: "道路千万条，安全第一条\r\n行车不规范，亲人两行泪",
            icon: "safe.jpg"
          });
        }
      });
    }
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}
html {
  font-size: 100%;
}
body {
  margin: 0;
}
#pop {
  position: absolute;
  display: none;
}
.ui-tabs {
  margin-bottom: 0 !important;
}
.ui-tabs__body {
  display: none !important;
}
</style>
