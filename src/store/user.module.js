import { UserService } from "@/common/api.service";
import { SET_DAFTAR_KELAS } from "./mutations.type";
import { FETCH_PROFILE } from "./actions.type";
import { SET_PROFILE } from "./mutations.type";
/* eslint-disable no-console */
const state = {
  errors: {},
  profile: []
};

const getters = {
  profile(state) {
    return state.profile;
  }
};

const actions = {
  [FETCH_PROFILE](context, idToken) {
    return new Promise(resolve => {
      console.log(idToken);
      // const profileRequest = {
      //   idToken: 'idToken',
      // };
      return UserService.getUserProfile(idToken).then(({ data }) => {
        console.log(data, "Return Data");
        console.log(data.data);
        context.commit(SET_PROFILE, data);
        resolve(data);
      });
    });
  }
};

const mutations = {
  [SET_DAFTAR_KELAS](state, listKelas) {
    state.listKelas = listKelas.data;
    // console.log("SET_DAFTAR_KELAS");
    // console.log(state.daftarkelas);
    state.errors = {};
  },
  [SET_PROFILE](state, profile) {
    state.profile = profile.data;
    state.errors = {};
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
