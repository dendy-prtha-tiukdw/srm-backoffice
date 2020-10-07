import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import GAuth from 'vue-google-oauth2'
import "./registerServiceWorker";
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.config.productionTip = false;
Vue.use(GAuth, {
  clientId: '527371133243-u55mahrjjgb6d6a2hkl4ath7tjrhl6gg.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
  prompt: 'consent',
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
