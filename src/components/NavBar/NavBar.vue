<template>
  <div class="navbar">
    <ui-tabs
      fullwidth
      type="icon-and-text"
    >
      <ui-tab id="home" icon="home" title="Home" @select="tabChange"></ui-tab>
      <ui-tab id="login" icon="person" title="Authors" @select="tabChange"></ui-tab>
      <ui-tab icon="microscope" title="Collections"></ui-tab>
      <ui-tab icon="person" iconSet="segmdl2"  title="Favourites"></ui-tab>
    </ui-tabs>
  </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'NavBar',
  methods: {
    tabChange (event) {
      router.push(event)
    }
  },
  mounted () {
    document.getElementsByClassName('ui-tabs__body')[0].style.display = 'none'
  }
}
</script>

<style>
</style>
