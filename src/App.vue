<template>
  <div id="app" :style="{backgroundImage: 'url(' +backgroungImg + ')'}">
    <nav-bar/>
    <header style="height:80px;"/>
    <transition name="slide-fade" mode="out-in">
      <router-view/>
    </transition>
    <BackTop/>
    <!-- 用于硬件加速 -->
    <my-footer style="-webkit-transform: translateZ(0);-moz-transform: translateZ(0);-ms-transform: translateZ(0);transform: translateZ(0);"/>
  </div>
</template>
<script>
import navBar from "./components/navBar/navBar";
import myFooter from "./components/footer/footer";
export default {
  name: "App",
  components: { navBar, myFooter },
  data() {
    return {
      backgroungImg: require("@/assets/image.jpg")
    };
  },
  mounted(){
    document.title = this.$t('message.productName');
  }
}
</script>
<style>
#app {
  background: url();
  background-color: #efefef !important;
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
