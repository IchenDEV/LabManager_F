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
import fetch from '@/util/fetch.js'
import 'iview/dist/styles/iview.css'
import '@babel/polyfill'
import VueI18n from 'vue-i18n'
import en from 'iview/dist/locale/en-US'
import zh from 'iview/dist/locale/zh-CN'
import  VueQuillEditor from 'vue-quill-editor'
import VCharts from 'v-charts'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
Vue.use(KeenUI)
Vue.use(Vuex)
Vue.use(VCharts)
Vue.use(iView)
Vue.use(VueI18n)
Vue.locale = () => {};

Vue.config.productionTip = false
/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    //host: '//localhost:8080/',
    //host: '//api.idevlab.cn:8080/',
    //host: '//idevlab.cn:8080/',
    host:'//'+process.env.VUE_APP_SERVER_HOST+':'+process.env.VUE_APP_SERVER_PORT+'/',
    currentUser: {
      username: '',
      nickname: '',
      reputation:0,
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
    /* eslint-disable */
    onDataReached(st,da,that){
      let state = this.state
      if(da.code=='20011'&&state.hasSingin==true){
        console.log("cf")
        state.hasSingin==false
        that.$Notice.warning({
          title: 'Login Expired'
       });
        this.cleanInfo()
      }
    }
  }
})

function getlang() {
  if (navigator.language.toLowerCase() == 'zh-cn') {
    return navigator.language.toLowerCase()
  }else{
    return 'en'
  }
}
const i18n = new VueI18n({
  locale: getlang(), // 语言标识
  messages: {
    'zh-cn': Object.assign(require('./assets/common/lang/zh-cn'),zh), // 中文语言包
    'en': Object.assign(require('./assets/common/lang/en'),en) // 英文语言包
  },
})
new Vue({
  router,
  store,
  i18n,
  mounted() {
    this.$store.dispatch('getInfo')
    document.title=this.$t('message.productName')
    // 删除加载动画demo
    if (document.getElementById('nb-global-spinner')) {
      document.body.removeChild(document.getElementById('nb-global-spinner'));
    }
  },
  render: h => h(App)
}).$mount('#app')
