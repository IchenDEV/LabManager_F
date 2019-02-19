// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'iview'
import router from './router'
import KeenUI from 'keen-ui'
import 'keen-ui/dist/keen-ui.css'
import 'url-search-params-polyfill'
import Vuex from 'vuex'
import VueNotifications from 'vue-notifications'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import fetch from '@/util/fetch.js'
import 'iview/dist/styles/iview.css'
import '@babel/polyfill'
import VueI18n from 'vue-i18n'

function toast({
  title,
  message,
  type,
  timeout
}) {
  if (type === VueNotifications.types.warn) type = 'warning'
  return iziToast[type]({
    title,
    message,
    timeout
  })
}
const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

Vue.use(VueNotifications, options)
Vue.use(KeenUI)
Vue.use(Vuex)
Vue.use(iView)
Vue.use(VueI18n)
Vue.config.productionTip = false
/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    //host: '//localhost:8080/',
    host: '//lab.idevlab.cn:8080/',
    //host: '//idevlab.cn:8080/',
    currentUser: {
      username: '',
      nickname: '',
      id: 0
    },
    hasSingin: false,
    isAdmin: false,
    isSuperAdmin: false
  },
  actions: {
    getInfo() {
      let state = this.state
      fetch({
          method: 'Post',
          url: state.host + '/login/getInfo'
        })
        .then(res => {
          if (res.data.code === '100') {
            state.hasSingin = true
            state.currentUser.nickname = res.data.info.userPermission.nickname
            state.currentUser.username = this.username
            state.currentUser.id = res.data.info.userPermission.userId
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
    }
  }
})

const i18n = new VueI18n({
  locale: 'zh-cn',    // 语言标识
  messages: {
    'zh-cn': require('./assets/common/lang/zh-cn'),   // 中文语言包
    'en': require('./assets/common/lang/en')    // 英文语言包
  },
})

new Vue({
  router,
  store,
  i18n,
  mounted() {
    this.$store.dispatch('getInfo')
      // 删除加载动画demo
      if (document.getElementById('nb-global-spinner')) {
        document.body.removeChild(document.getElementById('nb-global-spinner'));
      }
  },
  render: h => h(App)
}).$mount('#app')
