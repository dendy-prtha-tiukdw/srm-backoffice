import Vue from "vue";
import Vuex from "vuex";

//import home from "./home.module";
import auth from "./auth.module";
import ui from "./ui.module";
import user from "./user.module";
import kelas from "./kelas.module";
import pengumuman from "./pengumuman.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ui,
    auth,
    user,
    kelas,
    pengumuman
    //article,
    //profile
  }
});
