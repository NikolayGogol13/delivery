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
        meta: {
            admin: true,
            owner: false
        },
        children: [
            {
                path: 'dashboard',
                name: 'admin-dashboard',
                meta: {
                    admin: true,
                    owner: false
                },
                component: () => import( /* webpackChunkName: "adminDashboard" */ '../views/admin/Dashboard.vue')
            },
            {
                path: 'owners',
                name: 'admin-owners',
                meta: {
                    admin: true,
                    owner: false
                },
                component: () => import( /* webpackChunkName: "adminOwners" */ '../views/admin/Owners.vue')
            },
            {
                path: 'create-owner',
                name: 'create-owner',
                meta: {
                    admin: true,
                    owner: false
                },
                component: () => import( /* webpackChunkName: "createOwner" */ '../views/admin/CreateOwner.vue')
            }
        ]
    },
    {
        path: '/owner-login',
        name: 'Owner-login',
        component: () => import(/* webpackChunkName: "ownerLogin" */ '../views/owner/Login.vue')
    },
    {
        path: '/owner',
        name: 'Owner',
        component: () => import(/* webpackChunkName: "owner" */ '../views/owner/Owner.vue'),
        meta: {
            owner: true,
            admin: false
        },
        children: [
            {
                path: 'dashboard',
                name: 'owner-dashboard',
                meta: {
                    owner: true,
                    admin: false
                },
                component: () => import( /* webpackChunkName: "ownerDashboard" */ '../views/owner/Dashboard.vue')
            },
            {
                path: 'create-business',
                name: 'create-business',
                meta: {
                    owner: true,
                    admin: false
                },
                component: () => import( /* webpackChunkName: "createBusiness" */ '../views/owner/CreateBusiness.vue')
            },
            {
                path: 'business',
                name: 'business',
                meta: {
                    owner: true,
                    admin: false
                },
                component: () => import( /* webpackChunkName: "business" */ '../views/owner/Business.vue')
            },
            {
                path: 'crud-business/:id',
                name: 'crud-business',
                meta: {
                    owner: true,
                    admin: false
                },
                component: () => import( /* webpackChunkName: "crud-business" */ '../views/owner/BusinessCRUD.vue')
            },
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
