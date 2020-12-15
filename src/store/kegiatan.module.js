import { KegiatanService } from "@/common/api.service";
import {
  KEGIATAN_CREATE,
  KEGIATAN_DELETE,
  KEGIATAN_UPDATE,
  KEGIATAN_RESET_STATE,
  FETCH_DAFTAR_KEGIATAN
} from "./actions.type";
import { SET_ERROR, RESET_STATE, SET_LIST_KEGIATAN } from "./mutations.type";
/* eslint-disable no-console */
const initialState = {
  kegiatan: {
    idKegiatan: "",
    group: "",
    namaMatakuliah: "",
    judulKegiatan: "",
    kegiatan: "",
    semester: "",
    tahunAjaran: "",
    isComplete: "",
    tanggalDibuat: "",
    tanggalBerakhir: ""
  },
  listKegiatan: {},
  errors: {}
};

export const state = { ...initialState };

const getters = {
  kegiatan(state) {
    return state.kegiatan;
  },
  daftarKegiatan(state) {
    return state.listKegiatan;
  },
  destroyKegiatan(state) {
    return state.IdKegiatan;
  }
};

export const actions = {
  [KEGIATAN_CREATE]({ commit, state }) {
    return new Promise(resolve => {
      KegiatanService.create(state.kegiatan)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          console.log(response);
          commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [KEGIATAN_DELETE]({ commit, state }) {
    console.log(state.kegiatan);
    return new Promise(resolve => {
      KegiatanService.delete(state.kegiatan)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          console.log(response);
          commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [KEGIATAN_UPDATE]({ commit, state }) {
    console.log(state.kegiatan);
    return new Promise(resolve => {
      KegiatanService.update(state.kegiatan)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          console.log(response);
          commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [FETCH_DAFTAR_KEGIATAN](context, daftarKegiatanRequest) {
    return new Promise((resolve, reject) => {
      KegiatanService.getDaftarKegiatan(daftarKegiatanRequest)
        .then(({ data }) => {
          context.commit(SET_LIST_KEGIATAN, data.data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  [KEGIATAN_RESET_STATE]({ commit }) {
    commit(RESET_STATE);
  }
};

export const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [RESET_STATE]() {
    // console.log("RESET_STATE");
    state.kegiatan.idKegiatan = "";
    state.kegiatan.group = "";
    state.kegiatan.namaMatakuliah = "";
    state.kegiatan.judulKegiatan = "";
    state.kegiatan.kegiatan = "";
    state.kegiatan.semester = "";
    state.kegiatan.tahunAjaran = "";
    state.kegiatan.isComplete = "";
    state.kegiatan.tanggalDibuat = "";
    state.kegiatan.tanggalBerakhir = "";
  },
  [SET_LIST_KEGIATAN](state, data) {
    state.listKegiatan = data;
    // console.log(state.listKegiatan);
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
