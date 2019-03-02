<template>
  <div :class="{'col-panel':mobileView,'row-panel':!mobileView}" >
    <admin-menu></admin-menu>
    <router-view :class="{'left':!mobileView}"/>
  </div>
</template>
<script>
import AdminMenu from "@/components/Menu/Menu"
export default {
  components :{AdminMenu},
  data() {
    return {
      screenWidth: document.body.clientWidth,
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
