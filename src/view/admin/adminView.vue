<template>
  <div :class="{'col-panel':mobileView,'row-panel':!mobileView}">
    <admin-menu :class="{'mx':!mobileView}" />
    <transition name="slide-fade" mode="out-in" >
      <router-view :class="{'center':!mobileView}"/>
    </transition>
  </div>
</template>
<script>
import adminMenu from "@/components/menu/menu"
export default {
  components :{adminMenu},
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
<style>
.mx{
 padding-left: 10px;
}
</style>

