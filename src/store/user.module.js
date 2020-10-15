import { UserService } from "@/common/api.service";
import { FETCH_DAFTAR_KELAS } from "./actions.type";
import { SET_DAFTAR_KELAS } from "./mutations.type";
/* eslint-disable no-console */
const state = {
  errors: {},
  daftarkelas: []
};

const getters = {
  daftarKelas(state) {
    return state.daftarkelas;
  }
};

const actions = {
  [FETCH_DAFTAR_KELAS]({ commit }) {
    console.log("FETCH_DAFTAR_KELAS");
    return UserService.getDaftarKelas()
      .then(({ data }) => {
        console.log(data);
        commit(SET_DAFTAR_KELAS, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

const mutations = {
  [SET_DAFTAR_KELAS](state, daftarkelas) {
    state.daftarkelas = daftarkelas.data;
    console.log("SET_DAFTAR_KELAS");
    console.log(state.daftarkelas);
    state.errors = {};
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
