<template>
  <div :class="{'col-panel':mobileView,'row-panel':!mobileView}">
    <admin-menu :class="{'mx':!mobileView}"/>
    <transition name="slide-fade" mode="out-in">
      <router-view :class="{'center':!mobileView,'cx':!mobileView}" style="flex:1;"/>
    </transition>
  </div>
</template>
<script>
import adminMenu from "@/components/menu/menu";
export default {
  components: { adminMenu },
  computed: {
    mobileView() {
      return this.$store.state.screenWidth <= 600;
    }
  }
};
</script>
<style>
.mx {
  padding-left: 10px;
}
.cx {
  max-width: 90%;
}
</style>

