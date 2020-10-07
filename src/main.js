import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import GAuth from "vue-google-oauth2";
import "./registerServiceWorker";
import axios from "axios";
//import GAuth from "./utils/GoogleAuth"
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(GAuth, {
  clientId:
    "527371133243-9tr4gvi7vic5g3b3p5fr10dtrgs4kvgo.apps.googleusercontent.com",
  scope:
    "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar",
  prompt: "consent"
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
