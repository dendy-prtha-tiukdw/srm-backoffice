import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("@/views/Login")
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/Home")
    },
    {
      path: "/daftarkelas",
      name: "daftarkelas",
      component: () => import("@/views/DaftarKelas")
    },
    {
      path: "/kelas",
      name: "kelas",
      component: () => import("@/views/Kelas"),
      props: true
    },
    {
      path: "/editkelas",
      name: "editkelas",
      props: true,
      component: () => import("@/views/EditKelas")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/About")
    },
    {
      path: "/daftarpengumuman",
      name: "daftarpengumuman",
      props: true,
      component: () => import("@/views/DaftarPengumuman")
    },
    {
      path: "/editpengumuman",
      name: "editpengumuman",
      props: true,
      component: () => import("@/views/EditPengumuman")
    },
    {
      path: "/daftarkegiatan",
      name: "daftarkegiatan",
      props: true,
      component: () => import("@/views/DaftarKegiatan")
    },
    {
      path: "/editkegiatan",
      name: "editkegiatan",
      props: true,
      component: () => import("@/views/EditKegiatan")
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/Profile")
    }
  ]
});
