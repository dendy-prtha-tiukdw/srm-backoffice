import { KelasService } from "@/common/api.service";
import { FETCH_DETAIL_KELAS } from "./actions.type";
import { SET_DETAIL_KELAS, SET_ERROR } from "./mutations.type";
/* eslint-disable no-console */
const state = {
  errors: {},
  detailKelas: []
};

const getters = {
  detailKelas(state) {
    return state.detailKelas;
  }
};

const actions = {
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
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_DETAIL_KELAS](state, detailKelas) {
    state.detailKelas = detailKelas.data;
    // console.log("SET_DAFTAR_KELAS");
    // console.log(state.detailKelas);
    state.errors = {};
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
