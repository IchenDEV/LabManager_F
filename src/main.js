// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import KeenUI from 'keen-ui'
import 'keen-ui/dist/keen-ui.css'
import 'url-search-params-polyfill'
import Vuex from 'vuex'
import VueNotifications from 'vue-notifications'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import fetch from '@/util/fetch.js'

function toast ({
  title,
  message,
  type,
  timeout,
  cb
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
Vue.config.productionTip = false
/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    host: '//localhost:8080/',
    //  host: '//acm.idevlab.cn:8080/',
    currentUser: {
      username: '',
      nickname: '',
      id: 0
    },
    hasSingin: false,
    isAdmin: false
  },
  actions: {
    getInfo () {
      let state = this.state
      fetch({
        method: 'Post',
        url: state.host + '/login/getInfo'
      })
        .then(res => {
          console.log(res)
          if (res.data.code === '100') {
            console.log('1')
            state.hasSingin = true
            state.currentUser.nickname = res.data.info.userPermission.nickname
            state.currentUser.username = this.username
            state.currentUser.id = res.data.info.userPermission.userId
            if (res.data.info.userPermission.roleId === 1) {
              state.isAdmin = true
            }
          } else {}
          this.iswaitting = false
        })
    }
  },
  mutations: {
    cleanInfo () {
      let state = this.state
      state.hasSingin = false
      state.currentUser.nickname = ''
      state.currentUser.username = ''
      state.currentUser.id = ''
      state.isAdmin = false
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  mounted () {
    this.$store.dispatch('getInfo')
  }
})
