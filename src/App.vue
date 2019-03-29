<template>
  <div id="app">
    <nav-bar/>
    <transition name="slide-fade" mode="out-in">
      <router-view class="center" style="max-width:1108px;"/>
    </transition>
    <BackTop/>
    <my-footer/>
  </div>
</template>
<script>
import navBar from "./components/navBar/navBar";
import myFooter from "./components/footer/footer";

export default {
  name: "App",
  components: { navBar, myFooter },
  mounted() {
    document.title = this.$t("message.productName");
  }
};
</script>
<style>
#app {
  background-color: #f5f5f5 !important;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  font-family: "Avenir", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}
</style>
