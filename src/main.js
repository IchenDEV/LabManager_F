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

function toast ({title, message, type, timeout, cb}) {
  if (type === VueNotifications.types.warn) type = 'warning'
  return iziToast[type]({title, message, timeout})
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
    // host: '//localhost:8080/',
    host: '//acm.idevlab.cn:8080',
    currentUser: {
      username: '',
      nickname: '',
      id: 0
    },
    hasSingin: false
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
