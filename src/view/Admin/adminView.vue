<template>
  <div :class="{'col-panel':mobileView,'row-panel':!mobileView}" >
    <admin-menu :class="{'mx':!mobileView}"></admin-menu>
    <transition name="slide-fade" mode="out-in">
    <router-view :class="{'center':!mobileView}" v-if="isRouterAlive"/>
    </transition>
  </div>
</template>
<script>
import AdminMenu from "@/components/Menu/Menu"
export default {
  components :{AdminMenu},
  data() {
    return {
      screenWidth: document.body.clientWidth,
      isRouterAlive: true
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
        that.screenWidth = document.body.clientWidth;
      })();
    };
  }
};
</script>
<style>
.mx{
 padding-left: 10px;
}
</style>

