import { KelasService } from "@/common/api.service";
import {
  FETCH_DAFTAR_KELAS,
  FETCH_DAFTAR_DOSEN,
  FETCH_DAFTAR_MATAKULIAH,
  FETCH_DETAIL_KELAS,
  FETCH_PESERTA_KELAS,
  PESERTA_KELAS_CREATE,
  PESERTA_KELAS_DELETE,
  KELAS_CREATE,
  KELAS_DELETE,
  KELAS_RESET_STATE,
  PESERTA_RESET_STATE,
  KELAS_UPDATE,
  DAFTAR_KELAS
} from "./actions.type";
import {
  SET_DAFTAR_KELAS,
  SET_DETAIL_KELAS,
  SET_PESERTA_KELAS,
  SET_ERROR,
  RESET_STATE,
  SET_LIST_MATAKULIAH,
  SET_LIST_DOSEN
} from "./mutations.type";
/* eslint-disable no-console */
const state = {
  errors: {},
  detailKelas: [],
  daftarKelas: [],
  listKelas: {
    semester: "",
    tahunAjaran: ""
  },
  pesertaKelas: [],
  createPeserta: {
    group: "",
    namaMatakuliah: "",
    nim: "",
    semester: "",
    tahunAjaran: ""
  },
  deletePeserta: {
    namaMatakuliah: "",
    nim: "",
    semester: "",
    tahunAjaran: ""
  },
  kelas: {
    group: "",
    hari: "",
    namaMatakuliah: "",
    nik: [""],
    semester: "",
    sesi: "",
    tahunAjaran: ""
  },
  updateKelas: {
    newData: {
      group: "",
      hari: "",
      namaMatakuliah: "",
      nik: [""],
      semester: "",
      sesi: "",
      tahunAjaran: ""
    },
    request: {
      group: "",
      namaMatakuliah: "",
      semester: "",
      tahunAjaran: ""
    }
  },
  matakuliah: {
    prodi: "Informatika"
  },
  dosen: {
    prodi: "Informatika"
  },
  listDosen: {},
  listMatakuliah: {}
};

const getters = {
  daftarKelas(state) {
    return state.daftarKelas;
  },
  listKelas(state) {
    return state.listKelas;
  },
  matakuliah(state) {
    return state.matakuliah;
  },
  daftarMatakuliah(state) {
    return state.listMatakuliah;
  },
  dosen(state) {
    return state.dosen;
  },
  daftarDosen(state) {
    return state.listDosen;
  },
  kelas(state) {
    return state.kelas;
  },
  detailKelas(state) {
    return state.detailKelas;
  },
  pesertaKelas(state) {
    return state.pesertaKelas;
  },
  createPeserta(state) {
    return state.createPeserta;
  },
  deletePeserta(state) {
    return state.deletePeserta;
  },
  updateKelas(state) {
    return state.updateKelas;
  }
};

const actions = {
  [FETCH_DAFTAR_KELAS]({ commit, state }) {
    // console.log("FETCH_DAFTAR_KELAS");
    return new Promise((resolve, reject) => {
      KelasService.getDaftarKelas(state.listKelas)
        .then(({ data }) => {
          commit(SET_DAFTAR_KELAS, data.data);
          resolve(data);
        })
        .catch(({ response }) => {
          commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  [KELAS_CREATE]({ commit, state }) {
    return new Promise(resolve => {
      KelasService.create(state.kelas, state.matakuliah)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          console.log(response);
          commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [KELAS_DELETE]({ commit, state }) {
    console.log(state.detailKelas);
    return new Promise(resolve => {
      KelasService.delete(state.detailKelas)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          console.log(response);
          commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [KELAS_UPDATE]({ commit, state }) {
    console.log(state.updateKelas);
    return new Promise(resolve => {
      KelasService.update(state.updateKelas, state.matakuliah)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          console.log(response);
          commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [FETCH_DETAIL_KELAS](context, detailKelasRequest) {
    return new Promise(resolve => {
      // console.log(detailKelasRequest);
      KelasService.getDetailKelas(detailKelasRequest)
        .then(({ data }) => {
          context.commit(SET_DETAIL_KELAS, data);
          // console.log("success");
          resolve(data);
        })
        .catch(({ response }) => {
          console.log("error");
          context.commit(SET_ERROR, response);
        });
    });
  },
  [FETCH_PESERTA_KELAS](context, pesertaKelasRequest) {
    return new Promise(resolve => {
      // console.log(detailKelasRequest);
      KelasService.getPesertaKelas(pesertaKelasRequest)
        .then(({ data }) => {
          context.commit(SET_PESERTA_KELAS, data);
          // console.log("success");
          resolve(data);
        })
        .catch(({ response }) => {
          console.log("error");
          context.commit(SET_ERROR, response);
        });
    });
  },
  [PESERTA_KELAS_CREATE]({ commit, state }) {
    return new Promise(resolve => {
      KelasService.savePesertaKelas(state.createPeserta)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          console.log(response);
          commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [PESERTA_KELAS_DELETE]({ commit }, dataHapus) {
    return new Promise(resolve => {
      KelasService.deletePesertaKelas(dataHapus)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          console.log(response);
          commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [FETCH_DAFTAR_MATAKULIAH](context, matakuliahList) {
    return new Promise((resolve, reject) => {
      KelasService.getMatakuliahList(matakuliahList)
        .then(({ data }) => {
          context.commit(SET_LIST_MATAKULIAH, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  [FETCH_DAFTAR_DOSEN](context, dosenList) {
    return new Promise((resolve, reject) => {
      KelasService.getDosenList(dosenList)
        .then(({ data }) => {
          context.commit(SET_LIST_DOSEN, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  [DAFTAR_KELAS](context, dosenList) {
    return new Promise((resolve, reject) => {
      KelasService.getDaftarKelas(dosenList)
        .then(({ data }) => {
          context.commit(SET_LIST_DOSEN, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  [PESERTA_RESET_STATE]({ commit }) {
    commit(RESET_STATE);
  },
  [KELAS_RESET_STATE]({ commit }) {
    commit(RESET_STATE);
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_DETAIL_KELAS](state, detailKelas) {
    state.detailKelas = detailKelas.data;
    state.errors = {};
  },
  [SET_PESERTA_KELAS](state, pesertaKelas) {
    state.pesertaKelas = pesertaKelas.data;
    state.errors = {};
  },
  [SET_DAFTAR_KELAS](state, daftarKelas) {
    state.daftarKelas = daftarKelas.data;
    state.errors = {};
  },
  [SET_LIST_MATAKULIAH](state, listMatakuliah) {
    state.listMatakuliah = listMatakuliah.data;
    state.errors = {};
  },
  [SET_LIST_DOSEN](state, listDosen) {
    state.listDosen = listDosen.data;
    state.errors = {};
  },
  [RESET_STATE]() {
    console.log("RESET_STATE");
    state.kelas.group = "";
    state.kelas.namaMatakuliah = "";
    state.kelas.pengumuman = "";
    state.kelas.semester = "";
    state.kelas.tahunAjaran = "";
    state.kelas.hari = "";
    state.kelas.nik = [];
    state.kelas.sesi = "";
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
