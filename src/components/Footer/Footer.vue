<template>
  <footer class="footer">
    <ui-alert :dismissible="false">{{$t('message.footerAlert')}}</ui-alert>
    <h2>{{$t('message.productName')}}</h2>
    <p>{{$t('message.devBy')}}</p>
    <p>Beta</p>
  </footer>
</template>
<script>
export default {}
</script>
<style>
.footer {
  margin-top: 1.5rem;
  background: #f2f2f2;
  font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 0.9375rem;
  padding: 1.5rem;
  padding-bottom: 5rem;
  z-index: -1;
}
</style>
