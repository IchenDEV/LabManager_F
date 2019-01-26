<template>
  <div>
    <QRScanner v-on:recived='handle($event)'></QRScanner>
   <vue-qr text="Hello world!"  qid="testid"></vue-qr>
  </div>
</template>
<script>
import VueQr from 'vue-qr'
import QRScanner from '@/components/QRScanner/QRScanner'
export default {
  name: 'homeView',
  components: {VueQr, QRScanner},
  data () {
    return {
      qrcodeUrl: '1312'
    }
  }
}
</script>
