import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './assets/scss/app.scss'
import VueFirestore from 'vue-firestore'
import firebase from 'firebase'
Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyDJvrhmRwG18dR91ndWwNwqJZapTkfRyuE",
  authDomain: "my-project-1505985398534.firebaseapp.com",
  databaseURL: "https://my-project-1505985398534.firebaseio.com",
  projectId: "my-project-1505985398534",
  storageBucket: "my-project-1505985398534.appspot.com",
  messagingSenderId: "706438167449",
  appId: "1:706438167449:web:312f5b21f16689b324b108"
};

Vue.use(VueFirestore)

const firebaseApp = firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

export const db = firebaseApp.firestore();
export const frStore = firebase.storage().ref();
export const frDatabase = firebase.database();