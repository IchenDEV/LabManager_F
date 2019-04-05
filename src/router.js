import Vue from 'vue'
import Router from 'vue-router'

const myView = () => import('@/view/myView')
const View404 = () => import( /* webpackChunkName: "V404" */ '@/view/404')
const loginView = () => import('@/view/loginView')
const bookView = () => import('@/view/bookView')
const findView = () => import('@/view/findView')
const homeView = () => import('@/view/homeView')
const calendarView = () => import('@/view/calendarView')
const deviceView = () => import('@/view/public/deviceView')
const departmentView = () => import('@/view/public/departmentView')
const groupView = () => import('@/view/public/groupView')
const userView = () => import('@/view/public/userView')
const projectView = () => import('@/view/public/projectView')
const labView = () => import('@/view/public/labView')

const departmentAdmin = () => import( /* webpackChunkName: "editorPage" */ '@/view/admin/editorPage/departmentAdmin')
const groupAdmin = () => import( /* webpackChunkName: "editorPage" */ '@/view/admin/editorPage/groupAdmin')
const userAdmin = () => import( /* webpackChunkName: "editorPage" */ '@/view/admin/editorPage/userAdmin')
const projectAdmin = () => import( /* webpackChunkName: "editorPage" */ '@/view/admin/editorPage/projectAdmin')
const deviceAdmin = () => import( /* webpackChunkName: "editorPage" */ '@/view/admin/editorPage/deviceAdmin')
const labAdmin = () => import( /* webpackChunkName: "editorPage" */ '@/view/admin/editorPage/labAdmin')

const announcement = () => import( /* webpackChunkName: "infoListPageA" */ '@/view/admin/infoListPage/announcement')
const device = () => import( /* webpackChunkName: "infoListPageA" */ '@/view/admin/infoListPage/device')
const log = () => import( /* webpackChunkName: "infoListPageA" */ '@/view/admin/infoListPage/log')
const book = () => import( /* webpackChunkName: "infoListPageA" */ '@/view/admin/infoListPage/book')
const lab = () => import( /* webpackChunkName: "infoListPageA" */ '@/view/admin/infoListPage/lab')
const project = () => import( /* webpackChunkName: "infoListPageA" */ '@/view/admin/infoListPage/project')
const user = () => import( /* webpackChunkName: "infoListPageA" */ '@/view/admin/infoListPage/user')
const group = () => import( /* webpackChunkName: "infoListPage" */ '@/view/admin/infoListPage/group')
const backup = () => import( /* webpackChunkName: "infoListPage" */ '@/view/admin/infoListPage/backup')
const statistics = () => import( /* webpackChunkName: "infoListPage" */ '@/view/admin/infoListPage/statistics')
const department = () => import( /* webpackChunkName: "infoListPage" */ '@/view/admin/infoListPage/department')

const adminView = () => import('@/view/admin/adminView')

Vue.use(Router)
export default new Router({
  routes: [{
      path: '/home',
      name: 'homeView',
      component: homeView
    },
    {
      path: '/',
      redirect: '/home',
      name: 'homeView'
    },
    {
      path: '/calendar',
      name: 'calendarView',
      component: calendarView
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
      name: 'deviceView',
      component: deviceView
    },
    {
      path: '/department/:id',
      name: 'departmentView',
      component: departmentView
    },
    {
      path: '/group/:id',
      name: 'groupView',
      component: groupView
    },
    {
      path: '/user/:id',
      name: 'userView',
      component: userView
    },
    {
      path: '/project/:id',
      name: 'projectView',
      component: projectView
    },
    {
      path: '/lab/:id',
      name: 'labView',
      component: labView
    },
    {
      path: '/admin/',
      redirect: '/admin/device',
      name: 'adminView',
      component: adminView,
      children: [{
          path: 'department',
          name: 'adminView',
          component: department
        },
        {
          path: 'backup',
          name: 'adminView',
          component: backup
        },
        {
          path: 'announcement',
          name: 'adminView',
          component: announcement
        },
        {
          path: 'statistics',
          name: 'adminView',
          component: statistics
        },
        {
          path: 'department/:id',
          name: 'adminView',
          component: departmentAdmin
        },
        {
          path: 'log',
          name: 'adminView',
          component: log
        },
        {
          path: 'lab',
          name: 'adminView',
          component: lab
        },
        {
          path: 'lab/:id',
          name: 'adminView',
          component: labAdmin
        },
        {
          path: 'project',
          name: 'adminView',
          component: project
        },
        {
          path: 'project/:id',
          name: 'adminView',
          component: projectAdmin
        },
        {
          path: 'device',
          name: 'adminView',
          component: device
        },
        {
          path: 'device/:id',
          name: 'adminView',
          component: deviceAdmin
        },
        {
          path: 'group',
          name: 'adminView',
          component: group
        },
        {
          path: 'group/:id',
          name: 'adminView',
          component: groupAdmin
        },
        {
          path: 'user',
          name: 'adminView',
          component: user
        },
        {
          path: 'user/:id',
          name: 'adminView',
          component: userAdmin
        },
        {
          path: 'book',
          name: 'adminView',
          component: book
        }
      ]
    },
    {
      path: '*',
      name: 'V404View',
      component: View404
    }
  ]
})
