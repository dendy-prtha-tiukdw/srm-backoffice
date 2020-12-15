<template>
  <div class="col-md-9">
    <fieldset>
      <fieldset class="form-group">
        <input
          class="form-control form-control-lg"
          v-model="pengumuman.judulPengumuman"
          placeholder="Judul pengumuman"
        />
      </fieldset>
      <fieldset class="form-group">
        <textarea
          class="form-control"
          rows="8"
          v-model="pengumuman.pengumuman"
          placeholder="Isi pengumuman Anda"
        >
        </textarea>
      </fieldset>
      <fieldset class="form-group tanggal">
        <h5><b>Tanggal Pengumuman Berakhir </b></h5>
        <datetime
          format="YYYY-MM-DD H:i:s"
          width="60%"
          v-model="pengumuman.tanggalBerakhir"
          placeholder="Masukan tanggal pengumuman berakhir"
        ></datetime>
      </fieldset>
    </fieldset>
    <button class="btn btn-primary" @click="onUmumkan">
      Umumkan
    </button>
    &nbsp;&nbsp;&nbsp;
    <button
      class="btn btn-outline-danger btn-warning"
      v-if="this.isUpdating"
      @click="onHapusPengumuman"
    >
      <i class="ion-trash-a"></i> <span>&nbsp;Hapus Pengumuman</span>
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  PENGUMUMAN_CREATE,
  PENGUMUMAN_UPDATE,
  PENGUMUMAN_DELETE,
  PENGUMUMAN_RESET_STATE
} from "@/store/actions.type";
import { mapGetters } from "vuex";
import store from "@/store";
import datetime from "vuejs-datetimepicker";
/* eslint-disable no-console */

export default {
  name: "editpengumumankelas",
  components: {
    datetime
  },
  data() {
    return {
      isUpdating: false,
      errors: {}
    };
  },
  async beforeRouteLeave(to, from, next) {
    await store.dispatch(PENGUMUMAN_RESET_STATE);
    next();
  },
  mounted() {
    console.log("this.$route.params");
    console.log(this.$route.params);
    this.isUpdating = this.$route.params.isUpdating;
    this.pengumuman.group = this.$route.params.pengumuman.group;
    this.pengumuman.namaMatakuliah = this.$route.params.pengumuman.namaMatakuliah;
    this.pengumuman.semester = this.$route.params.pengumuman.semester;
    this.pengumuman.tahunAjaran = this.$route.params.pengumuman.tahunAjaran;
    this.pengumuman.idPengumuman = this.$route.params.pengumuman.idPengumuman;
    this.pengumuman.judulPengumuman = this.$route.params.pengumuman.judulPengumuman;
    this.pengumuman.pengumuman = this.$route.params.pengumuman.pengumuman;
    this.pengumuman.tanggalBerakhir = this.$route.params.pengumuman.tanggalBerakhir;

    console.log(this.pengumuman);
  },
  methods: {
    onUmumkan() {
      let action = this.isUpdating ? PENGUMUMAN_UPDATE : PENGUMUMAN_CREATE;
      this.$store
        .dispatch(action)
        .then(({ data }) => {
          console.log(data);
          this.$router.push({
            name: "daftarpengumumankelas",
            params: {
              group: this.pengumuman.group,
              namaMatakuliah: this.pengumuman.namaMatakuliah,
              semester: this.pengumuman.semester,
              tahunAjaran: this.pengumuman.tahunAjaran
            }
          });
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
        });
    },
    onHapusPengumuman() {
      this.$store
        .dispatch(PENGUMUMAN_DELETE)
        .then(({ data }) => {
          console.log(data);
          this.$router.push({
            name: "daftarpengumumankelas",
            params: {
              group: this.pengumuman.group,
              namaMatakuliah: this.pengumuman.namaMatakuliah,
              semester: this.pengumuman.semester,
              tahunAjaran: this.pengumuman.tahunAjaran
            }
          });
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
        });
    }
  },

  computed: {
    ...mapGetters(["pengumuman", "isAuthenticated"])
  }
};
</script>
