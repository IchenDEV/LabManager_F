import Vue from 'vue'
import Router from 'vue-router'
import myView from '../view/myView'
import loginView from '../view/loginView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/my',
      name: 'myView',
      component: myView
    },
    {
      path: '/login',
      name: 'loginView',
      component: loginView
    }
  ]
})
