<template>
  <div :class="{'col-panel':mobileView,'row-panel':!mobileView}" >
    <admin-menu></admin-menu>
    <router-view :class="{'center':!mobileView}" v-if="isRouterAlive"/>
  </div>
</template>
<script>
import AdminMenu from "@/components/Menu/Menu"
export default {
  components :{AdminMenu},
  provide() {
    return {
      reloadAdmin: this.reloadAdmin
    };
  },
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
  },
  methods: {
    reloadAdmin() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    }
  }
};
</script>
