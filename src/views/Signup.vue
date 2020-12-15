<template>
  <div class="signup">
    <div class="container page">
      <div class="row" style="margin-top: 200px">
        <div class="col-md-6" style="margin-left: 37%">
          <h1>SRM BackOffice</h1>
        </div>
        <div class="col-md-6 offset-md-3 col-xs-12">
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            aria-label="Username"
            aria-describedby="basic-addon1"
            v-model="signup.email"
          />
        </div>
        <div class="col-md-6 offset-md-3 col-xs-12">
          <input
            type="text"
            class="form-control"
            placeholder="Nomor Induk"
            aria-label="Username"
            aria-describedby="basic-addon1"
            v-model="signup.nomorInduk"
          />
        </div>
        <div class="col-md-6 offset-md-3 col-xs-12">
          <select class="custom-select col-12 w-100" v-model="signup.role">
            <option value="ROLE_DOSEN">ROLE_DOSEN</option>
            <option value="ROLE_MAHASISWA">ROLE_MAHASISWA</option>
            <option value="ROLE_STAFF">ROLE_STAFF</option>
          </select>
        </div>
        <div class="col-md-6 offset-md-3 col-xs-12">
          <button
            class="btn btn-block btn-lg btn-primary pull-xs-center"
            @click="handleSignUp"
          >
            Sign Up
          </button>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { SIGN_UP } from "@/store/actions.type";
import { mapGetters } from "vuex";
// import store from "@/store";
/* eslint-disable no-console */

export default {
  name: "registeruser",
  data() {
    return {
      role: ["ROLE_DOSEN", "ROLE_STAFF", "ROLE_MAHASISWA"],
      isUpdating: false,
      errors: {}
    };
  },
  mounted() {},
  methods: {
    handleSignUp() {
      this.$store
        .dispatch(SIGN_UP)
        .then(({ data }) => {
          console.log(data);
          this.$router.push({
            name: "login"
          });
        })
        .catch(({ response }) => {
          this.errors = response;
        });
    }
  },

  computed: {
    ...mapGetters(["signup", "isAuthenticated"])
  }
};
</script>
