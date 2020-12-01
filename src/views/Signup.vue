<template>
  <v-app>
    <div class="col-md-9">
      <fieldset>
        <v-container fluid>
          <v-col><h1>SIGN UP</h1></v-col>
          <!-- Hari Matakuliah -->
          <v-col cols="4">
            <div class="mb-n9">
              <v-text-field label="Masukan Email" v-model="signup.email" filled>
              </v-text-field>
            </div>
          </v-col>
          <!-- Group Kelas -->
          <v-col cols="4">
            <div class="mb-n9">
              <v-text-field
                label="Masukan Nomor Induk"
                v-model="signup.nomorInduk"
                filled
              >
              </v-text-field>
            </div>
          </v-col>
          <!-- Role Akun -->
          <v-col cols="4">
            <div class="sesi mb-n9">
              <v-combobox
                v-model="signup.role"
                :items="role"
                clearable
                filled
                label="Pilih Role Akun"
              ></v-combobox>
            </div>
          </v-col>
          <v-col>
            <v-btn color="success" @click="handleSignUp" dark>
              Sign Up
            </v-btn>
          </v-col>
        </v-container>
        &nbsp;&nbsp;&nbsp;
      </fieldset>
    </div>
  </v-app>
</template>

<script>
// @ is an alias to /src
import { SIGN_UP } from "@/store/actions.type";
import { mapGetters } from "vuex";
// import store from "@/store";
/* eslint-disable no-console */

export default {
  name: "editpengumuman",
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
