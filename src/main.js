import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import messageplagin from './plagins/message.pl'
import 'materialize-css/dist/js/materialize.min.js'
import './registerServiceWorker'

createApp(App).use(store).use(router).use(messageplagin).mount('#app')
