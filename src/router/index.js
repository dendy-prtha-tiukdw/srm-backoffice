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
      path: "/useraccount/signup",
      name: "edituseraccount",
      props: true,
      component: () => import("@/views/useraccount/EditUserAccount")
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/Home")
    },
    {
      path: "/daftarkelas",
      name: "daftarkelas",
      component: () => import("@/views/kelas/DaftarKelas")
    },
    {
      path: "/kelas/detailkelas",
      name: "detailkelas",
      component: () => import("@/views/kelas/DetailKelas"),
      props: true
    },
    {
      path: "/kelas/editkelas",
      name: "editkelas",
      props: true,
      component: () => import("@/views/kelas/EditKelas")
    },
    {
      path: "/kelas/daftarpengumuman",
      name: "daftarpengumumankelas",
      props: true,
      component: () => import("@/views/kelas/DaftarPengumuman")
    },
    {
      path: "/kelas/editpengumuman",
      name: "editpengumumankelas",
      props: true,
      component: () => import("@/views/kelas/EditPengumuman")
    },
    {
      path: "/kelas/daftarkegiatan",
      name: "daftarkegiatan",
      props: true,
      component: () => import("@/views/kelas/DaftarKegiatan")
    },
    {
      path: "/kelas/editkegiatan",
      name: "editkegiatankelas",
      props: true,
      component: () => import("@/views/kelas/EditKegiatan")
    },
    {
      path: "/kelas/editpeserta",
      name: "editpesertakelas",
      props: true,
      component: () => import("@/views/kelas/EditPeserta")
    },
    {
      path: "/daftaruseraccount",
      name: "daftaruseraccount",
      component: () => import("@/views/useraccount/DaftarUserAccount")
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/Profile")
    }
  ]
});
