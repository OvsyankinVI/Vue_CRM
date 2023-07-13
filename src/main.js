import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import messageplagin from './plagins/message.pl'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'materialize-css/dist/js/materialize.min.js'
import './registerServiceWorker'

firebase.initializeApp({
  apiKey: 'AIzaSyCADVYF0qXEga2COPhBudhOAb4vctU35KM',
  authDomain: 'ovi-vue-crm-db856.firebaseapp.com',
  projectId: 'ovi-vue-crm-db856',
  storageBucket: 'ovi-vue-crm-db856.appspot.com',
  messagingSenderId: '771586056424',
  appId: '1:771586056424:web:2298d6961fecdd16c6695d',
  measurementId: 'G-BB2GCP41DX'
})

createApp(App).use(store).use(router).use(messageplagin).mount('#app')
