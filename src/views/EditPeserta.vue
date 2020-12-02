<template>
  <div class="col-md-9">
    <fieldset>
      <fieldset class="form-group">
        <input
          class="form-control form-control-lg"
          v-model="createPeserta.nim"
          placeholder="Masukan NIM Mahasiswa"
        />
      </fieldset>
      <button class="btn btn-primary" @click="onTambahPeserta">
        Tambah Mahasiswa
      </button>
    </fieldset>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  PESERTA_KELAS_CREATE,
  PESERTA_RESET_STATE
} from "@/store/actions.type";
import { mapGetters } from "vuex";
import store from "@/store";
/* eslint-disable no-console */

export default {
  name: "editpeserta",
  components: {},
  data() {
    return {
      errors: {}
    };
  },

  async beforeRouteLeave(to, from, next) {
    await store.dispatch(PESERTA_RESET_STATE);
    next();
  },
  mounted() {
    console.log("this.$route.params");
    console.log(this.$route.params);
    this.createPeserta.group = this.detailKelas.group;
    this.createPeserta.namaMatakuliah = this.detailKelas.namaMatakuliah;
    this.createPeserta.semester = this.detailKelas.semester;
    this.createPeserta.tahunAjaran = this.detailKelas.tahunAjaran;
    this.createPeserta.nim = this.createPeserta.nim;

    console.log(this.createPeserta);
  },
  methods: {
    onTambahPeserta() {
      this.$store
        .dispatch(PESERTA_KELAS_CREATE)
        .then(({ data }) => {
          console.log(data);
          this.$router.push({
            name: "kelas",
            params: {
              group: this.createPeserta.group,
              namaMatakuliah: this.createPeserta.namaMatakuliah,
              semester: this.createPeserta.semester,
              tahunAjaran: this.createPeserta.tahunAjaran,
              nim: this.createPeserta.nim
            }
          });
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
        });
    }
    // onHapusPengumuman() {
    //   this.$store
    //     .dispatch(PENGUMUMAN_DELETE)
    //     .then(({ data }) => {
    //       console.log(data);
    //       this.$router.push({
    //         name: "daftarpengumuman",
    //         params: {
    //           group: this.pengumuman.group,
    //           namaMatakuliah: this.pengumuman.namaMatakuliah,
    //           semester: this.pengumuman.semester,
    //           tahunAjaran: this.pengumuman.tahunAjaran
    //         }
    //       });
    //     })
    //     .catch(({ response }) => {
    //       this.errors = response.data.errors;
    //     });
    // }
  },

  computed: {
    ...mapGetters(["detailKelas", "createPeserta", "isAuthenticated"])
  }
};
</script>
