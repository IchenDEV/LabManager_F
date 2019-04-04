<template>
  <footer class="footer">
    <h2>{{$t('message.productName')}}</h2>
    <p>{{$t('message.devBy')}}</p>
    <a href="https://www.perficient.com">{{$t("message.links")}}</a>
  </footer>
</template>
<script>
export default {};
</script>
<style>
.footer {
  margin-top: 50px;
  background: #ffffff;
  font-size: 0.9rem;
  padding: 1.5rem;
  padding-bottom: 5rem;
  z-index: -1;
  border-radius: 0.6rem 0.6rem 0 0;
  -webkit-transform: translateZ(10);
  -moz-transform: translateZ(10);
  -ms-transform: translateZ(10);
  transform: translateZ(10);
}
</style>
