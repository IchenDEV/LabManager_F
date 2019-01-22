<template>
<div>
  <QRScanner v-on:recived='handle($event)'></QRScanner>
</div>
</template>
<script>
import QRScanner from '@/components/QRScanner/QRScanner'
export default {
  name: 'homeView',
  components: {QRScanner},
  methods: {
    handle (eve) {
      alert(eve)
    }
  }
}
</script>
