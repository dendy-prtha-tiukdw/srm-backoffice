/* eslint-disable no-console */
import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";

import {
  LOGIN,
  LOGOUT,
  REGISTER,
  CHECK_AUTH,
  UPDATE_USER
} from "./actions.type";
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from "./mutations.type";

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getRefreshToken()
};

const getters = {
  currentUser(state) {
    state.user = {
      name: JwtService.getName(),
      role: JwtService.getRole(),
      email: JwtService.getEmail(),
      imgUlr: JwtService.getImgUrl(),
      noInduk: JwtService.getNoInduk(),
      idToken: JwtService.getIdToken(),
      accessToken: JwtService.getAccessToken(),
      refreshToken: JwtService.getRefreshToken()
    };
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

const actions = {
  [LOGIN](context, authCode) {
    return new Promise(resolve => {
      console.log(authCode);
      const signInRequest = {
        serverAuthCode: authCode,
        clientType: "web_app"
      };
      ApiService.post("auth/signin", signInRequest)
        .then(({ data }) => {
          //console.log(data.data);
          if (
            data.data.role == "ROLE_DOSEN" ||
            data.data.role == "ROLE_STAFF"
          ) {
            context.commit(SET_AUTH, data.data);
            resolve(data);
          } else {
            // console.log("role unauthorize");
            context.commit(SET_ERROR, "role unauthorize");
          }
        })
        .catch(({ response }) => {
          console.log("error");
          context.commit(SET_ERROR, response);
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("users", { user: credentials })
        .then(({ data }) => {
          context.commit(SET_AUTH, data.user);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  [CHECK_AUTH](context) {
    if (JwtService.getAccessToken()) {
      // console.log(JwtService.getRefreshToken());
      // console.log(JwtService.getIdToken());
      // console.log(JwtService.getAccessToken());
      //ApiService.setHeader();
      // ApiService.get("user")
      //   .then(({ data }) => {
      //     context.commit(SET_AUTH, data.user);
      //   })
      //   .catch(({ response }) => {
      //     context.commit(SET_ERROR, response.data.errors);
      //   });
    } else {
      console.log("belum login");
      context.commit(PURGE_AUTH);
    }
  },
  [UPDATE_USER](context, payload) {
    const { email, username, password, image, bio } = payload;
    const user = {
      email,
      username,
      bio,
      image
    };
    if (password) {
      user.password = password;
    }

    return ApiService.put("user", user).then(({ data }) => {
      context.commit(SET_AUTH, data.user);
      return data;
    });
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
    console.log("FROM mutations SET_AUTH");
    console.log(user);
    JwtService.saveUserSession(
      user.accessToken,
      user.idToken,
      user.email,
      user.fcmToken,
      user.imageUrl,
      user.nama,
      user.nomorInduk,
      user.refreshToken,
      user.role
    );
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyUserSession();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
