import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/Home")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login")
    },
    {
      path: "/daftar-kelas",
      name: "daftar-kelas",
      component: () => import("@/views/DaftarKelas")
    }
  ]
});
