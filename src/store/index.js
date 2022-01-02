import Vue from 'vue'
import Vuex from 'vuex'
import home from '@/store/auth/admin-auth'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        home
    },
    plugins: [
        createPersistedState({
            key: 'global-state',
            paths: ['global']
        })
    ]
})
