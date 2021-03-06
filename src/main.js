/* eslint-disable no-undef */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//#region import
import Vue from 'vue'
import '@babel/polyfill'
import App from './App'
import {
  UiCollapsible,
  UiTooltip,
  UiButton,
  UiFab,
  UiSwitch,
  UiIcon,
  UiModal,
  UiTabs,
  UiTab,
  UiMenu,
  UiSelect,
  UiTextbox,
  UiAlert,
  UiDatepicker
} from 'keen-ui'
import router from './router'

import Vuex from 'vuex'
import tools from '@/util/tools.js'
import VueI18n from 'vue-i18n'
import en from 'iview/dist/locale/en-US'
import zh from 'iview/dist/locale/zh-CN'
import VueQuillEditor from 'vue-quill-editor'


import '@/assets/public_css.css'
import 'office-ui-fabric-core/dist/css/fabric.min.css'
import 'keen-ui/dist/keen-ui.css'
import 'iview/dist/styles/iview.css'
import OfficeUIFabricVue from 'office-ui-fabric-vue';
// import css style
import 'office-ui-fabric-vue/dist/index.css';
import iView from 'iview'
Vue.use(iView)

Vue.use(VueQuillEditor)
Vue.use(Vuex)
Vue.use(VueI18n)
Vue.locale = () => {};

Vue.component('UiCollapsible', UiCollapsible)
Vue.component('UiButton', UiButton)
Vue.component('UiSwitch', UiSwitch)
Vue.component('UiFab', UiFab)
Vue.component('UiIcon', UiIcon)
Vue.component('UiModal', UiModal)
Vue.component('UiTabs', UiTabs)
Vue.component('UiTab', UiTab)
Vue.component('UiSelect', UiSelect)
Vue.component('UiAlert', UiAlert)
Vue.component('UiTooltip', UiTooltip)
Vue.component('UiTextbox', UiTextbox)
Vue.component('UiDatepicker', UiDatepicker)
Vue.component('UiMenu', UiMenu)


Vue.use(OfficeUIFabricVue);
//#endregion

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    screenWidth: 222,
    currentUser: {
      username: '',
      nickname: '',
      reputation: 0,
      id: 0
    },
    isListMode: true,
    path: 'homeView',
    modal: false,
    hasSingin: false,
    isAdmin: false,
    isSuperAdmin: false
  },
  actions: {
    getInfo() {
      let state = this.state
      tools.easyfetch(tools.Api.UserInfo, this.con).then(
        res => {
          if (res.data.code == '100') {
            state.hasSingin = true

            state.currentUser.nickname = res.data.info.userPermission.nickname
            state.currentUser.username = res.data.info.userPermission.username
            state.currentUser.id = res.data.info.userPermission.id
            state.currentUser.reputation = res.data.info.userPermission.reputation
            if (res.data.info.userPermission.roleId === 1) {
              state.isSuperAdmin = true
              state.isAdmin = true
            }
            if (res.data.info.userPermission.roleId === 2) {
              state.isAdmin = true
            }
            create(res.data.info.userPermission.id).then(body => {
              if (body != null) {
                tools.easyfetch(tools.Api.PushSignUp, body)
              }
            })
          }
          this.iswaitting = false
        })

    }
  },
  mutations: {
    cleanInfo() {
      let state = this.state
      state.hasSingin = false
      state.currentUser.nickname = ''
      state.currentUser.username = ''
      state.currentUser.id = ''
      state.isAdmin = false
    },
    removeLoadingAmi() {
      if (document.getElementById('nb-global-spinner')) {
        document.body.removeChild(document.getElementById('nb-global-spinner'));
      }
    }
  }
})

//#region mutilanguage
function getLocalLang() {
  if (navigator.language.toLowerCase() == 'zh-cn') {
    return navigator.language.toLowerCase()
  } else {
    return 'en'
  }
}
const i18n = new VueI18n({
  locale: getLocalLang(),
  messages: {
    'zh-cn': Object.assign(require('@/assets/common/lang/zh-cn'), zh),
    'en': Object.assign(require('@/assets/common/lang/en'), en)
  },
})
//#endregion
/* eslint-disable */
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach((to) => {
  iView.LoadingBar.finish();
  store.state.path = to.name;
  if (to.name == null && to.path == '/') {
    router.push("/home");
    return;
  }
  if (!store.state.hasSingin && to.path != '/login') {
    router.push("/home");
    return;
  }
})

new Vue({
  router,
  store,
  i18n,
  mounted() {
    this.$store.dispatch('getInfo')
    this.$store.commit('removeLoadingAmi');
    const that = this;
    that.$store.state.screenWidth = document.body.clientWidth;
    window.onresize = () => {
      return (() => {
        that.$store.state.screenWidth = document.body.clientWidth;
      })();
    };
  },
  render: h => h(App)
}).$mount('#app')
