<template>
  <div class='navbar'>
    <ui-tabs style="margin-bottom: 0;"
      fullwidth
      type='icon-and-text'
    >
      <ui-tab id='home'  icon='home'            title='Home'  @select='tabChange'></ui-tab>
      <ui-tab id='find'  icon='find_in_page'    title='查询'  @select='tabChange'></ui-tab>
      <ui-tab id='book'  icon='book'            title='预定'  @select='tabChange'></ui-tab>
      <ui-tab id='my'    icon='person'          title='我'    @select='tabChange'></ui-tab>
      <ui-tab v-if="isAdmin" id='admin'    icon='person'       title='管理员'    @select='tabChange'></ui-tab>
    </ui-tabs>
  </div>
</template>
<script>
import router from '@/router'
export default {
  name: 'NavBar',
  methods: {
    tabChange (event) {
      router.push('../' + event)
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
.ui-tabs{
  margin-bottom: 0;
}
</style>
