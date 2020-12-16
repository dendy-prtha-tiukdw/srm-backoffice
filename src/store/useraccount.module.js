import { UserAccountService } from "@/common/api.service";
import {
  FETCH_DAFTAR_USERACCOUNT,
  USERACCOUNT_RESET_STATE,
  USERACCOUNT_CREATE,
  USERACCOUNT_UPDATE,
  USERACCOUNT_DELETE
} from "./actions.type";
import {
  SET_ERROR,
  SET_LIST_USER_ACCOUNT,
  RESET_STATE
} from "./mutations.type";
/* eslint-disable no-console */
const state = {
  errors: {},
  daftarUserAccount: [],
  userAccount: {
    id: "",
    email: "",
    role: ""
  }
};

const getters = {
  daftarUserAccount(state) {
    return state.daftarUserAccount;
  },
  userAccount(state) {
    return state.userAccount;
  },
  errors(state) {
    return state.errors;
  }
};

const actions = {
  [FETCH_DAFTAR_USERACCOUNT](context) {
    return new Promise((resolve, reject) => {
      return UserAccountService.getDaftarUserAccount()
        .then(({ data }) => {
          // console.log(data, "Return Data");
          // console.log(data.data);
          context.commit(SET_LIST_USER_ACCOUNT, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
          reject(response);
        });
    });
  },
  [USERACCOUNT_CREATE]({ commit, state }) {
    let createAccountRequest = {
      nomorInduk: state.userAccount.id,
      email: state.userAccount.email,
      role: state.userAccount.role
    };
    console.log(createAccountRequest);
    return new Promise((resolve, reject) => {
      return UserAccountService.create(createAccountRequest)
        .then(({ data }) => {
          // console.log(data, "Return Data");
          // console.log(data.data);
          commit(RESET_STATE);
          resolve(data);
        })
        .catch(response => {
          commit(SET_ERROR, response);
          reject(response);
        });
    });
  },
  [USERACCOUNT_UPDATE]({ commit, state }) {
    let updateAccountRequest = {
      userId: state.userAccount.id,
      email: state.userAccount.email,
      role: state.userAccount.role
    };
    console.log(updateAccountRequest);
    return new Promise((resolve, reject) => {
      return UserAccountService.update(updateAccountRequest)
        .then(({ data }) => {
          // console.log(data, "Return Data");
          // console.log(data.data);
          commit(RESET_STATE);
          resolve(data);
        })
        .catch(response => {
          commit(SET_ERROR, response);
          reject(response);
        });
    });
  },
  [USERACCOUNT_DELETE]({ commit, state }) {
    let deleteAccountRequest = {
      userId: state.userAccount.id
    };
    console.log(deleteAccountRequest);
    return new Promise((resolve, reject) => {
      return UserAccountService.delete(deleteAccountRequest)
        .then(({ data }) => {
          // console.log(data, "Return Data");
          // console.log(data.data);
          commit(RESET_STATE);
          resolve(data);
        })
        .catch(response => {
          commit(SET_ERROR, response);
          reject(response);
        });
    });
  },
  [USERACCOUNT_RESET_STATE]({ commit }) {
    commit(RESET_STATE);
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [RESET_STATE]() {
    state.userAccount.id = "";
    state.userAccount.nama = "";
    state.userAccount.email = "";
    state.userAccount.role = "";
    state.errors = {};
  },
  [SET_LIST_USER_ACCOUNT](state, daftarUserAccount) {
    state.daftarUserAccount = daftarUserAccount.data;
    for (let index = 0; index < state.daftarUserAccount.length; index++) {
      if (state.daftarUserAccount[index].role == "R01") {
        state.daftarUserAccount[index].role = "ROLE_DOSEN";
      } else if (state.daftarUserAccount[index].role == "R02") {
        state.daftarUserAccount[index].role = "ROLE_STAFF";
      } else if (state.daftarUserAccount[index].role == "R03") {
        state.daftarUserAccount[index].role = "ROLE_MAHASISWA";
      }
    }
    state.errors = {};
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
