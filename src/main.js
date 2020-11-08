import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import { CHECK_AUTH } from "./store/actions.type";
import ApiService from "./common/api.service";
import DateFilter from "./common/date.filter";
import ErrorFilter from "./common/error.filter";
import ToggleSwitch from 'vuejs-toggle-switch';
import ToggleButton from 'vue-js-toggle-button';
import vuetify from '@/plugins/vuetify'

import GAuth from "vue-google-oauth2";
import axios from "axios";
/* eslint-disable no-console */
Vue.use(vuetify);
Vue.config.productionTip = false;
Vue.filter("date", DateFilter);
Vue.filter("error", ErrorFilter);
Vue.use(ToggleSwitch);
Vue.use(ToggleButton);

ApiService.init();

// Ensure we checked auth before each page load.
router.beforeEach((to, from, next) => {
  Promise.all([store.dispatch(CHECK_AUTH)]).then(next);
});

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
  vuetify,
  render: h => h(App)
}).$mount("#app");
