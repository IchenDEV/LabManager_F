import Vue from 'vue'
import Router from 'vue-router'
import homeView from '@/view/homeView'
import loginView from '@/view/loginView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'homeView',
      component: homeView
    },
    {
      path: '/login',
      name: 'loginView',
      component: loginView
    }
  ]
})
