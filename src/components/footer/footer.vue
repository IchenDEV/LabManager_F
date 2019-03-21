<template>
  <Footer class="layout-footer-center" :style="{minHeight:minHeight + 'px'}">
    <!--页脚蓝色框和文字是否可以精简-->
    <ui-alert :dismissible="false">{{$t('message.footerAlert')}}</ui-alert>
    <div align="center" margin-top:100px>
    <h2>{{$t('message.productName')}}</h2>
    <p>{{$t('message.devBy')}}</p>
    <p>Beta</p>
    <a href="https://www.perficient.com">{{$t("message.links")}}</a>
    </div>
  </Footer>
</template>
<!--计算了窗口高度来使页面底部自适应-->
<script>
export default {
  data(){
    return{
      minHeight:0
    }
  },
  mounted(){
    this.minHeight = document.documentElement.clientHeight - 350
    var that = this
    window.onresize = function (){
      that.minHeight = document.documentElement.clientHeight -350
    }
  }
}
</script>
<style>
.layout-footer-center {
  margin-top: 200px; 
  background: #ffffff;
  font-size: 0.9rem;
  padding: 1.5rem;
  padding-bottom: 5rem;
  z-index: -1;
  border-radius: .5rem .5rem 0 0;
  -webkit-transform: translateZ(10);-moz-transform: translateZ(10);-ms-transform: translateZ(10);transform: translateZ(10);
  text-align: center;
}
</style>
