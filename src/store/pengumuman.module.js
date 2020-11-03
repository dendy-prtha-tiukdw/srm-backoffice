import { PengumumanService } from "@/common/api.service";
import {
  PENGUMUMAN_CREATE,
  PENGUMUMAN_DELETE,
  PENGUMUMAN_UPDATE,
  PENGUMUMAN_RESET_STATE,
  FETCH_DAFTAR_PENGUMUMAN
} from "./actions.type";
import { SET_ERROR, RESET_STATE, SET_LIST_PENGUMUMAN } from "./mutations.type";
/* eslint-disable no-console */
const initialState = {
  pengumuman: {
    group: "",
    namaMatkul: "",
    pengumuman: "",
    semester: "",
    tahunAjaran: "",
    IdPengumuman: ""
  },
  listPengumuman: {},
  errors: {}
};

export const state = { ...initialState };

const getters = {
  pengumuman(state) {
    return state.pengumuman;
  },
  daftarPengumuman(state) {
    return state.listPengumuman;
  },
  destroy(state){
    return state.IdPengumuman;
  }
  
};

export const actions = {
  [PENGUMUMAN_CREATE]({ commit, state }) {
    return new Promise(resolve => {
      PengumumanService.create(state.pengumuman)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          console.log(response);
          commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [PENGUMUMAN_DELETE]({ commit }, pengumuman) {
    // return PengumumanService.destroy(daftarPengumumanRequest);
    console.log(pengumuman)
    return new Promise(resolve => {
      PengumumanService.delete(pengumuman)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          console.log(response);
          commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [PENGUMUMAN_UPDATE]({ commit }, pengumuman) {
    console.log(pengumuman)
    return new Promise(resolve => {
      PengumumanService.update(pengumuman)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          console.log(response);
          commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [FETCH_DAFTAR_PENGUMUMAN](context, daftarPengumumanRequest) {
    return new Promise((resolve, reject) => {
      PengumumanService.getDaftarPengumuman(daftarPengumumanRequest)
        .then(({ data }) => {
          context.commit(SET_LIST_PENGUMUMAN, data.data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  [PENGUMUMAN_RESET_STATE]({ commit }) {
    commit(RESET_STATE);
  }
};

export const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [RESET_STATE]() {
    console.log("RESET_STATE");
    state.pengumuman.group = "";
    state.pengumuman.namaMatkul = "";
    state.pengumuman.pengumuman = "";
    state.pengumuman.semester = "";
    state.pengumuman.tahunAjaran = "";
  },
  [SET_LIST_PENGUMUMAN](state, data) {
    state.listPengumuman = data;
    console.log(state.listPengumuman);
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
