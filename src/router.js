import Vue from 'vue'
import Router from 'vue-router'
import myView from '@/view/myView'
import View404 from '@/view/404'
import loginView from '@/view/loginView'
import bookView from '@/view/bookView'
import homeView from '@/view/homeView'
import deviceView from '@/view/Device/deviceView'
import adminView from '@/view/Admin/adminView'
import backup from '@/view/Admin/backup'
import department from '@/view/Admin/department'
import departmentAdmin from '@/view/Admin/page/departmentAdmin'
import groupAdmin from '@/view/Admin/page/groupAdmin'
import userAdmin from '@/view/Admin/page/userAdmin'
import deviceAdmin from '@/view/Admin/page/deviceAdmin'
import labAdmin from '@/view/Admin/page/labAdmin'
import device from '@/view/Admin/device'
import log from '@/view/Admin/log'
import book from '@/view/Admin/book'
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
      redirect:'/admin/device',
      component: adminView,
      children: [
        {
          path: 'department',
          component: department
        },
        {
          path: 'backup',
          component: backup
        },
        {
          path: 'department/:id',
          component: departmentAdmin
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
          path: 'lab/:id',
          component: labAdmin
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
          path: 'device/:id',
          component: deviceAdmin
        },
        {
          path: 'group',
          component: group
        },
        {
          path: 'group/:id',
          component: groupAdmin
        },
        {
          path: 'user',
          component: user
        },
        {
          path: 'user/:id',
          component: userAdmin
        },
        {
          path: 'book',
          component: book
        }
      ]
    },
    {
      path: '*',
      component: View404
    }
  ]
})
