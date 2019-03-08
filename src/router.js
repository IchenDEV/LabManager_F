import Vue from 'vue'
import Router from 'vue-router'

const myView  = () => import ('@/view/myView')
const View404 =()=>import(/* webpackChunkName: "V404" */'@/view/404')
const loginView =()=> import('@/view/loginView')
const bookView =()=> import ('@/view/bookView')
const findView =()=> import ('@/view/findView')
const homeView =()=> import ('@/view/homeView')
const deviceView =()=> import ('@/view/Public/deviceView')

const departmentAdmin =()=> import (/* webpackChunkName: "MgrEachPage" */'@/view/Admin/MgrEachPage/departmentAdmin')
const groupAdmin =()=> import (/* webpackChunkName: "MgrEachPage" */'@/view/Admin/MgrEachPage/groupAdmin')
const userAdmin =()=> import (/* webpackChunkName: "MgrEachPage" */'@/view/Admin/MgrEachPage/userAdmin')
const projectAdmin =()=> import (/* webpackChunkName: "MgrEachPage" */'@/view/Admin/MgrEachPage/projectAdmin')
const deviceAdmin =()=> import (/* webpackChunkName: "MgrEachPage" */'@/view/Admin/MgrEachPage/deviceAdmin')
const labAdmin =()=> import (/* webpackChunkName: "MgrEachPage" */'@/view/Admin/MgrEachPage/labAdmin')

const announcement =()=> import (/* webpackChunkName: "MgrPage" */'@/view/Admin/MgrPage/announcement')
const device =()=>import (/* webpackChunkName: "MgrPage" */'@/view/Admin/MgrPage/device')
const log =()=> import (/* webpackChunkName: "MgrPage" */'@/view/Admin/MgrPage/log')
const book =()=> import (/* webpackChunkName: "MgrPage" */'@/view/Admin/MgrPage/book')
const lab =()=> import (/* webpackChunkName: "MgrPage" */'@/view/Admin/MgrPage/lab')
const project =()=> import (/* webpackChunkName: "MgrPage" */'@/view/Admin/MgrPage/project')
const user =()=> import (/* webpackChunkName: "MgrPage" */'@/view/Admin/MgrPage/user')
const group =()=> import (/* webpackChunkName: "MgrPage" */'@/view/Admin/MgrPage/group')
const backup =()=> import (/* webpackChunkName: "MgrPage" */'@/view/Admin/MgrPage/backup')
const statistics =()=> import (/* webpackChunkName: "MgrPage" */'@/view/Admin/MgrPage/statistics')
const department =()=> import (/* webpackChunkName: "MgrPage" */'@/view/Admin/MgrPage/department')

const adminView =()=> import ('@/view/Admin/adminView')

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
