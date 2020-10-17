import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/common/jwt.service";
import { API_URL } from "@/common/config";
/* eslint-disable no-console */
const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  setHeader() {
    Vue.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${JwtService.getAccessToken()}`;
  },

  query(resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get(resource, slug = "") {
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  createAxiosResponseInterceptor() {
    const interceptor = Vue.axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status != 401) {
          //return Promise.reject(error);
          throw new Error(`[RWV] ApiService ${error}`);
        }
        console.log("Refreshing access token!");
        //console.log(error.response);
        /*
         * When response code is 401, try to refresh the token.
         * Eject the interceptor so it doesn't loop in case
         * token refresh causes the 401 response
         */
        Vue.axios.interceptors.response.eject(interceptor);
        const refreshTokenRequest = {
          refreshToken: JwtService.getRefreshToken()
        };
        return Vue.axios
          .post("auth/refreshAccessToken", refreshTokenRequest)
          .then(({ data }) => {
            JwtService.saveAccessToken(data.data.accessToken);
            error.response.config.headers["Authorization"] =
              "Bearer " + data.data.accessToken;
            return axios(error.response.config);
          })
          .catch(error => {
            console.log(error);
            return new Error(`[RWV] ApiService ${error}`);
          });
        //.finally(createAxiosResponseInterceptor);
      }
    );
  },

  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  securedGet(resource, slug = "") {
    this.createAxiosResponseInterceptor();
    this.setHeader();
    return Vue.axios.get(`${resource}/${slug}`);
  },

  securedPost(resource, params) {
    this.createAxiosResponseInterceptor();
    this.setHeader();
    return Vue.axios.post(`${resource}`, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export default ApiService;

export const UserService = {
  getDaftarKelas() {
    return ApiService.securedGet("user/kelas");
  }
};

export const KelasService = {
  getDetailKelas(detailKelasRequest) {
    return ApiService.securedPost("kelas/detail", detailKelasRequest);
  }
};

export const PengumumanService = {
  create(pengumumanRequest) {
    return ApiService.securedPost("/pengumuman/create", pengumumanRequest);
  }
};
