import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './assets/scss/app.scss'
import VueFirestore from 'vue-firestore'
import firebase from 'firebase'
import guard from './middleware/rouer-guard'

Vue.config.productionTip = false
import axios from 'axios'
import {config} from "@/firebaseConfig/config"
import VueDatetimePickerJs from 'vue-date-time-picker-js';
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.component('date-picker', VueDatetimePickerJs);
const firebaseConfig = config

Vue.use(VueFirestore)

Vue.use(VueGoogleMaps, {
    load: {
        key: process.env.VUE_APP_GOOGLE_API_KEY,
        libraries: 'places',
        region: process.env.VUE_APP_I18N_LOCALE.toUpperCase(),
        language: process.env.VUE_APP_I18N_LOCALE,
    },
})
const baseURL = 'http://localhost:' + process.env.VUE_APP__PORT_LISTEN
if (typeof baseURL !== 'undefined') {
    axios.defaults.baseURL = baseURL
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
let app
// protect routers

firebase.auth().onAuthStateChanged(user => {
    if (!app) {
        new Vue({
            router,
            store,
            guard,
            vuetify,
            render: h => h(App)
        }).$mount('#app')
    }
})

export const db = firebaseApp.firestore();
export const frStore = firebase.storage().ref();
export const frDatabase = firebase.database();