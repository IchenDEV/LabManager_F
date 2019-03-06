import Vue from 'vue'
import Router from 'vue-router'

import myView from '@/view/myView'
import View404 from '@/view/404'
import loginView from '@/view/loginView'
import bookView from '@/view/bookView'
import findView from '@/view/findView'
import homeView from '@/view/homeView'
import deviceView from '@/view/Public/deviceView'

import departmentAdmin from '@/view/Admin/MgrEachPage/departmentAdmin'
import groupAdmin from '@/view/Admin/MgrEachPage/groupAdmin'
import userAdmin from '@/view/Admin/MgrEachPage/userAdmin'
import projectAdmin from '@/view/Admin/MgrEachPage/projectAdmin'
import deviceAdmin from '@/view/Admin/MgrEachPage/deviceAdmin'
import labAdmin from '@/view/Admin/MgrEachPage/labAdmin'

import announcement from '@/view/Admin/MgrPage/announcement'
import device from '@/view/Admin/MgrPage/device'
import log from '@/view/Admin/MgrPage/log'
import book from '@/view/Admin/MgrPage/book'
import lab from '@/view/Admin/MgrPage/lab'
import project from '@/view/Admin/MgrPage/project'
import user from '@/view/Admin/MgrPage/user'
import group from '@/view/Admin/MgrPage/group'
import backup from '@/view/Admin/MgrPage/backup'
import statistics from '@/view/Admin/MgrPage/statistics'
import department from '@/view/Admin/MgrPage/department'

import adminView from '@/view/Admin/adminView'

Vue.use(Router)
export default new Router({
  routes: [{
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
      path: '/find',
      name: 'findView',
      component: findView
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
      redirect: '/admin/device',
      component: adminView,
      children: [{
          path: 'department',
          component: department
        },
        {
          path: 'backup',
          component: backup
        },
        {
          path: 'announcement',
          component: announcement
        },
        {
          path: 'statistics',
          component: statistics
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
          path: 'project/:id',
          component: projectAdmin
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
