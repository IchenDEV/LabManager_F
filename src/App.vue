<template>
  <div id="app" >
    <nav-bar/>
    <header style="height:80px;"/>
    <transition name="slide-fade" mode="out-in">
      <router-view/>
    </transition>
    <BackTop/>
    <!-- 用于硬件加速 -->
    <my-footer />
  </div>
</template>
<script>
import navBar from "./components/navBar/navBar";
import myFooter from "./components/footer/footer";
export default {
  name: "App",
  components: { navBar, myFooter },
  mounted(){
    document.title = this.$t('message.productName');
  }
}
</script>
<style>
#app {
  background-color: #dfdfdf !important;
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
