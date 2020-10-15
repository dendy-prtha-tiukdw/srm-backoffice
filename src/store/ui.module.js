/* eslint-disable no-console */
import { TOGGLE_NAVBAR } from "./actions.type";

import { SET_NAVBAR } from "./mutations.type";

const state = {
  isNavOpen: false
};

const getters = {
  isNavOpen(state) {
    return state.isNavOpen;
  }
};

const actions = {
  [TOGGLE_NAVBAR](context) {
    context.commit(SET_NAVBAR);
  }
};

const mutations = {
  [SET_NAVBAR](state) {
    state.isNavOpen = !state.isNavOpen;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
