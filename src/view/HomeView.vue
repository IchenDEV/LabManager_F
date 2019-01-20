<template>
  <ui-tabs
    background-color="primary"
    fullwidth
    indicator-color="white"
    text-color-active="white"
    text-color="white"
    type="icon-and-text"
  >
    <ui-tab icon="search" title="Books">My books</ui-tab>
    <ui-tab icon="person" title="Authors">Authors</ui-tab>
    <ui-tab icon="microscope" title="Collections">My collections</ui-tab>
    <ui-tab icon="person-circle" title="Favourites"></ui-tab>
  </ui-tabs>
</template>
<script>
export default {
  name: 'HomeView'
}
</script>
