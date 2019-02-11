import Vue from 'vue'
import Router from 'vue-router'
import myView from '@/view/myView'
import loginView from '@/view/loginView'
import bookView from '@/view/bookView'
import homeView from '@/view/homeView'
import deviceView from '@/view/Device/deviceView'
import adminView from '@/view/Admin/adminView'
import department from '@/view/Admin/department'
import device from '@/view/Admin/device'
import log from '@/view/Admin/log'
import lab from '@/view/Admin/lab'
import project from '@/view/Admin/project'
import user from '@/view/Admin/user'
import group from '@/view/Admin/group'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/home',
      name: 'homeView',
      component: homeView
    },
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
          path: 'lab',
          component: lab
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
