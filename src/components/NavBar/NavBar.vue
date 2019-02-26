<template>
  <div class='navbar'>
    <ui-tabs style="margin-bottom: 0;"
      fullwidth
      type='icon-and-text'
    >
      <ui-tab id='home'  icon='home'            title='Home'  @select='tabChange'></ui-tab>
      <ui-tab id='find'  icon='find_in_page'    :title="$t('message.search')"  @select='tabChange' v-if="$store.state.hasSingin"></ui-tab>
      <ui-tab id='book'  icon='book'            :title="$t('message.appointment')"  @select='tabChange' v-if="$store.state.hasSingin"></ui-tab>
      <ui-tab id='my'    icon='person'          :title="$t('message.my')"    @select='tabChange'></ui-tab>
      <ui-tab v-if="isAdmin&&$store.state.hasSingin" id='admin'    icon='person'       :title="$t('message.admin')"    @select='tabChange'></ui-tab>
    </ui-tabs>
  </div>
</template>
<script>
import router from '@/router'
export default {
  data () {
    return {
      menuOptions: ['ä¸­æ–‡','è‹±æ–‡'],
      }
  },
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
.ui-tabs{
  margin-bottom: 0;
}
</style>
