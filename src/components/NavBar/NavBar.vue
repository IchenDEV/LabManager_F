<template>
<div>
  <div class='tabs' >
    <ui-tabs  fullwidth raised>
      <ui-tab id='test'  @select='tabChange' v-if="$store.state.hasSingin">
        <div slot="header" class="my-custom-tab-header">
            <ui-icon class="center" slot="icon" icon="find_in_page"></ui-icon> 
            <p>{{$t('message.search')}}</p>
        </div>
      </ui-tab>
      <ui-tab id='find'  @select='tabChange' v-if="$store.state.hasSingin">
        <div slot="header" class="my-custom-tab-header">
            <ui-icon class="center" slot="icon" icon="find_in_page"></ui-icon> 
            <p>{{$t('message.search')}}</p>
        </div>
      </ui-tab>
      <ui-tab id='book'  @select='tabChange' v-if="$store.state.hasSingin">
        <div slot="header" class="my-custom-tab-header">
            <ui-icon class="center" slot="icon" icon="book"></ui-icon> 
            <p>{{$t('message.appointment')}}</p>
        </div>
      </ui-tab>
      <ui-tab id='home'  icon='home'  title='Home'    @select='tabChange'>
        <div slot="header" class="my-custom-tab-header">
            <img class="center" slot="icon" src="favicon.ico" alt="logo"/> 
        </div>
      </ui-tab>
      <ui-tab id='my'  @select='tabChange' v-if="$store.state.hasSingin">
        <div slot="header" class="my-custom-tab-header">
            <ui-icon class="center" slot="icon" icon="person"></ui-icon> 
            <p class="center">{{$t('message.my')}}</p>
        </div>
      </ui-tab>
      <ui-tab v-if="isAdmin&&$store.state.hasSingin" id='admin'  @select='tabChange'>
        <div slot="header" class="my-custom-tab-header">
            <ui-icon class="center" slot="icon" icon="person"></ui-icon> 
            <p>{{$t('message.admin')}}</p>
        </div>
      </ui-tab>
    </ui-tabs>
  </div>
</div>
</template>
<script>
import router from '@/router'
export default {
  methods: {
    tabChange (event) {
      router.push('../../' + event)
    }
  },
  computed: {
    isAdmin () {
      return this.$store.state.isAdmin
    }
  },
  mounted () {
    document.getElementsByClassName('ui-tabs__body')[0].style.display = 'none'
  }
}
</script>
<style>
.tabs{
  margin-bottom: 4px;
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 50px;
  top: 0;
  font-size: 16px;
}
.my-custom-tab-header{
  display: flex;
  flex-wrap: wrap;
  text-align: center;
}
.my-custom-tab-header >p{
  margin: auto;
}
</style>
