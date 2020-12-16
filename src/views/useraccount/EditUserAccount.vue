<template>
  <div class="col-md-9">
    <fieldset class="form-group">
      <input
        :disabled="isUpdating"
        type="text"
        class="form-control"
        placeholder="Nomor Induk"
        aria-label="id"
        aria-describedby="basic-addon1"
        v-model="userAccount.id"
      />
    </fieldset>
    <fieldset class="form-group">
      <input
        type="text"
        class="form-control"
        placeholder="Email"
        aria-label="email"
        aria-describedby="basic-addon1"
        v-model="userAccount.email"
      />
    </fieldset>
    <fieldset class="form-group">
      <select class="custom-select col-12 w-100" v-model="userAccount.role">
        <option value="ROLE_DOSEN">ROLE_DOSEN</option>
        <option value="ROLE_MAHASISWA">ROLE_MAHASISWA</option>
        <option value="ROLE_STAFF">ROLE_STAFF</option>
      </select>
    </fieldset>
    <fieldset class="form-group">
      <button class="btn btn-primary" @click="onSimpanUserAccount">
        Simpan
      </button>
      &nbsp;&nbsp;&nbsp;
      <button class="btn btn-secondary btn-warning" @click="onBatalCreate">
        Batal
      </button>
      &nbsp;&nbsp;&nbsp;
      <button
        v-if="isUpdating"
        class="btn btn-outline-danger btn-warning"
        @click="onHapusUserAccount"
      >
        <i class="ion-trash-a"></i> <span>&nbsp;Hapus</span>
      </button>
    </fieldset>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  USERACCOUNT_CREATE,
  USERACCOUNT_RESET_STATE,
  USERACCOUNT_UPDATE,
  USERACCOUNT_DELETE
} from "@/store/actions.type";
import { mapGetters } from "vuex";
// import store from "@/store";
/* eslint-disable no-console */

export default {
  name: "edituseraccount",
  data() {
    return {
      isUpdating: false
    };
  },
  mounted() {
    console.log(this.$route.params);
    this.isUpdating = this.$route.params.isUpdating;
    if (Object.keys(this.$route.params).length > 1) {
      this.userAccount.id = this.$route.params.id;
      this.userAccount.nama = this.$route.params.nama;
      this.userAccount.email = this.$route.params.email;
      this.userAccount.role = this.$route.params.role;
    }
  },
  methods: {
    onSimpanUserAccount() {
      if (this.isUpdating) {
        this.$store
          .dispatch(USERACCOUNT_UPDATE)
          .then(({ data }) => {
            console.log(data);
            this.$router.push({
              name: "daftaruseraccount"
            });
          })
          .catch(error => {
            // this.errors = error;
            console.log("", error);
          });
      } else {
        this.$store
          .dispatch(USERACCOUNT_CREATE)
          .then(({ data }) => {
            console.log(data);
            this.$router.push({
              name: "daftaruseraccount"
            });
          })
          .catch(error => {
            // this.errors = error;
            console.log("", error);
          });
      }
    },
    onHapusUserAccount() {
      this.$store
        .dispatch(USERACCOUNT_DELETE)
        .then(({ data }) => {
          console.log(data);
          this.$router.push({
            name: "daftaruseraccount"
          });
        })
        .catch(error => {
          // this.errors = error;
          console.log("", error);
        });
    },
    onBatalCreate() {
      this.$store.dispatch(USERACCOUNT_RESET_STATE);
      this.$router.push({
        name: "daftaruseraccount"
      });
    }
  },

  computed: {
    ...mapGetters(["userAccount", "errors", "isAuthenticated"])
  }
};
</script>
