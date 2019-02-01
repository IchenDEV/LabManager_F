import Vue from 'vue'
import Router from 'vue-router'
import myView from '../view/myView'
import loginView from '../view/loginView'
import bookView from '../view/bookView'
import deviceView from '../view/deviceView'
import adminView from '../view/admin/adminView'
import department from '@/view/admin/department'
import device from '@/view/admin/device'
import log from '@/view/admin/log'
import project from '@/view/admin/project'
import user from '@/view/admin/user'
import group from '@/view/admin/group'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/my',
      name: 'myView',
      component: myView
    },
    {
      path: '/book',
      name: 'bookView',
      component: bookView
    },
    {
      path: '/login',
      name: 'loginView',
      component: loginView
    },
    {
      path: '/device/:id',
      component: deviceView
    },
    {
      path: '/admin/',
      component: adminView,
      children: [
        {
          path: 'department',
          component: department
        },
        {
          path: 'log',
          component: log
        },
        {
          path: 'project',
          component: project
        },
        {
          path: 'device',
          component: device
        },
        {
          path: 'group',
          component: group
        },
        {
          path: 'user',
          component: user
        }
      ]
    }
  ]
})
