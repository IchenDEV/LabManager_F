<template>
<div>
    <ui-select
      v-if="!isQrMode"
      has-search
      :label='label'
      :options='userInfo.list'
      :keys='{ label: "nickname", value: "id" }'
      v-model='select'
      @select="vs"
    ></ui-select>
    <QRScanner v-else @recived='QrRecived' />
    <ui-button color="primary" icon="cloud_download" @click="QR">QR</ui-button>
</div>
</template>
<script>
import tools from '@/util/tools.js'
import QRScanner from '@/components/QRScanner/QRScanner'
export default {
  props: { label: { default: '' }, selected:{ default: {id:0} }},
  components: {QRScanner},
  model: {
    prop: 'selected',
    event: 'change'
  },
  data () {
    return {
      userInfo: { list: [] },
      iswaitting: false,
      select: {id:0},
      isQrMode:false
    }
  },
  methods: {
    QR(){
      this.isQrMode=!this.isQrMode
    },
    QrRecived(data){
      this.select.id=data;
      this.$emit('change', this.select)
    },
    getUserInfo () {
      tools.easyfetch(tools.Api.ListUser,null)
        .then(res => {
          this.userInfo = res.data.info
        })
    },
    vs (){
        this.$emit('change', this.select)
    }
  },
  mounted () {
    if (this.$store.state.hasSingin === true) {
        this.getUserInfo()
    }
  }
}
</script>
