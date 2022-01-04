import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin-login',
    name: 'Admin-login',
    component: () => import(/* webpackChunkName: "adminLogin" */ '../views/admin/Login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/admin/Admin.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import( /* webpackChunkName: "adminDashboard" */ '../views/admin/Dashboard.vue')
      },
      {
        path: 'owners',
        name: 'admin-owners',
        component: () => import( /* webpackChunkName: "adminOwners" */ '../views/admin/Owners.vue')
      }
    ]
  },
  {
    path: '/owner',
    name: 'Owner',
    component: () => import(/* webpackChunkName: "owner" */ '../views/owner/Owner.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
