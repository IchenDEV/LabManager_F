import Vue from 'vue'
import Router from 'vue-router'
import Homeview from '@/view/Homeview'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homeview',
      component: Homeview
    }
  ]
})
