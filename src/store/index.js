import Vue from 'vue'
import Vuex from 'vuex'
import adminAuth from '@/store/auth/admin-auth'
import admin from '@/store/admin/admin'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        adminAuth,
        admin
    },
    plugins: [
        createPersistedState({
            key: 'global-state',
            paths: ['global']
        })
    ]
})
