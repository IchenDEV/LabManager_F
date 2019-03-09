<template>
  <div>
    <div class="tabs">
      <ui-tabs
        fullwidth
        raised
      >
        <ui-tab
          v-if="$store.state.hasSingin"
          id="find"
          @select="tabChange"
        >
          <div
            slot="header"
            class="my-custom-tab-header"
          >
            <ui-icon
              slot="icon"
              class="center"
              icon="find_in_page"
            /> 
            <p>{{ $t('message.search') }}</p>
          </div>
        </ui-tab>
        <ui-tab
          v-if="$store.state.hasSingin"
          id="book"
          @select="tabChange"
        >
          <div
            slot="header"
            class="my-custom-tab-header"
          >
            <ui-icon
              slot="icon"
              class="center"
              icon="book"
            /> 
            <p>{{ $t('message.appointment') }}</p>
          </div>
        </ui-tab>
        <ui-tab
          id="home"
          icon="home"
          title="Home"
          @select="tabChange"
        >
          <div
            slot="header"
            class="my-custom-tab-header"
          >
            <img
              slot="icon"
              class="center"
              src="favicon.ico"
              alt="logo"
            > 
          </div>
        </ui-tab>
        <ui-tab
          v-if="$store.state.hasSingin"
          id="my"
          @select="tabChange"
        >
          <div
            slot="header"
            class="my-custom-tab-header"
          >
            <ui-icon
              slot="icon"
              class="center"
              icon="person"
            /> 
            <p class="center">
              {{ $t('message.my') }}
            </p>
          </div>
        </ui-tab>
        <ui-tab
          v-if="isAdmin&&$store.state.hasSingin"
          id="admin"
          @select="tabChange"
        >
          <div
            slot="header"
            class="my-custom-tab-header"
          >
            <ui-icon
              slot="icon"
              class="center"
              icon="person"
            /> 
            <p>{{ $t('message.admin') }}</p>
          </div>
        </ui-tab>
      </ui-tabs>
    </div>
  </div>
</template>
<script>
import router from '@/router'
export default {
  computed: {
    isAdmin () {
      return this.$store.state.isAdmin
    }
  },
  mounted () {
    document.getElementsByClassName('ui-tabs__body')[0].style.display = 'none'
  },
  methods: {
    tabChange (event) {
      router.push('../../' + event)
    }
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
