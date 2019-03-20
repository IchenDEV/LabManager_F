// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//#region import
import Vue from 'vue'
import '@babel/polyfill'
import App from './App'
import {
  Card,
  Page,
  Timeline,
  TimePicker,
  Tooltip,
  Menu,
  MenuItem,
  Time,
  Tag,
  Modal,
  BackTop,
  Badge,
  Notice,
  Icon,
  Submenu,
  TimelineItem
} from 'iview'
import {
  UiTooltip,
  UiButton,
  UiFab,
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
import 'keen-ui/dist/keen-ui.css'
import 'iview/dist/styles/iview.css'

Vue.use(VueQuillEditor)
Vue.use(Vuex)
Vue.use(VueI18n)
Vue.locale = () => {};
Vue.component('Card', Card)
Vue.component('Page', Page)
Vue.component('TimelineItem', TimelineItem)
Vue.component('Tag', Tag)
Vue.component('Time', Time)
Vue.component('Timeline', Timeline)
Vue.component('TimePicker', TimePicker)
Vue.component('Tooltip', Tooltip)
Vue.component('Menu', Menu)
Vue.component('MenuItem', MenuItem)
Vue.component('Modal', Modal)
Vue.component('BackTop', BackTop)
Vue.component('Badge', Badge)
Vue.component('Submenu', Submenu)
Vue.component('Icon', Icon)
Vue.prototype.$Notice = Notice
Vue.config.productionTip = false

Vue.component('UiButton', UiButton)
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
//#endregion

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    currentUser: {
      username: '',
      nickname: '',
      reputation: 0,
      id: 0
    },
    path:'',
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
          if (res.data.code === '100') {
            state.hasSingin = true
            state.currentUser.nickname = res.data.info.userPermission.nickname
            state.currentUser.username = this.username
            state.currentUser.id = res.data.info.userPermission.id
            state.currentUser.reputation = res.data.info.userPermission.reputation
            if (res.data.info.userPermission.roleId === 1) {
              state.isSuperAdmin = true
              state.isAdmin = true
            }
            if (res.data.info.userPermission.roleId === 2) {
              state.isAdmin = true
            }
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
    },
    download(data) {
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", "export.xlsx");
      document.body.appendChild(link);
      link.click();
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
router.afterEach((to) => {
  if(to.name==null&&to.path=='/'){
    router.push("/home");
    return;
  }
  store.state.path=to.name;
  console.log(to);
})

new Vue({
  router,
  store,
  i18n,
  mounted() {
    this.$store.dispatch('getInfo')
    this.$store.commit('removeLoadingAmi')
  },
  render: h => h(App)
}).$mount('#app')
