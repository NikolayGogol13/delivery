import Vue from 'vue'
import Vuex from 'vuex'
import adminAuth from '@/store/auth/admin-auth'
import ownerAuth from '@/store/auth/owner-auth'
import admin from '@/store/admin/admin'
import owner from '@/store/owner/owner'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        adminAuth,
        ownerAuth,
        admin,
        owner,
    },
    plugins: [
        createPersistedState({
            key: 'global-state',
            paths: [
                'adminAuth.user',
                'adminAuth.isAuthAdmin',
                'ownerAuth.isAuthOwner',
                'ownerAuth.user',
            ]
        })
    ]
})
