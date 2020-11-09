<template>
  <div class="col-md-9">
    <fieldset>
      <fieldset class="form-group">
        <input
          class="form-control form-control-lg"
          v-model="kegiatan.judulKegiatan"
          placeholder="Judul kegiatan"
          v-text="'test kegiatan'"
        />
      </fieldset>
      <fieldset class="form-group">
        <textarea
          class="form-control"
          rows="8"
          v-model="kegiatan.kegiatan"
          placeholder="Isi kegiatan Anda"
        >
        </textarea>
      </fieldset>
      <fieldset class="form-group">
        <h5><b>Apakah Kegiatan Sudah Selesai?</b></h5>
        <!-- <v-app>
        <v-sheet class="pa-10">
          <v-switch
            v-model="complete"
            inset
          ></v-switch>
        </v-sheet> -->
         <v-container fluid>
          <v-radio-group
            v-model="kegiatan.isComplete"
            value="kegiatan.isComplete"
          >
            <v-radio
              label="Belum Selesai"
              value="false"
              change= kegiatan.isComplete
            ></v-radio>
            <v-radio
              label="Sudah Selesai"
              value="true"
              change= kegiatan.isComplete
            ></v-radio>
          </v-radio-group>
        </v-container>
        <!-- </v-app> -->
      </fieldset>
      <fieldset class="form-group tanggal">
        <h5> <b>Tanggal Kegiatan Berakhir </b></h5>
        <datetime format="YYYY-MM-DD H:i:s" width="60%" v-model="kegiatan.tanggalBerakhir" placeholder="Masukan tanggal kegiatan berakhir"></datetime>
      </fieldset>
    </fieldset>
    <button class="btn btn-primary" @click="onUmumkan">
      Umumkan
    </button>
    &nbsp;&nbsp;&nbsp;
    <button
      class="btn btn-outline-danger btn-warning"
      v-if="this.isUpdating"
      @click="onHapusKegiatan"
    >
      <i class="ion-trash-a"></i> <span>&nbsp;Hapus Kegiatan</span>
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  KEGIATAN_CREATE,
  KEGIATAN_UPDATE,
  KEGIATAN_DELETE,
  KEGIATAN_RESET_STATE
} from "@/store/actions.type";
import { mapGetters } from "vuex";
import store from "@/store";
import datetime from 'vuejs-datetimepicker';
// import ToggleButton from 'vue-js-toggle-button';
// import ToggleSwitch from 'vuejs-toggle-switch';
/* eslint-disable no-console */

export default {
  name: "editkegiatan",
  components: { 
      datetime,
  },
  data() {
    return {
      isUpdating: false,
      // checkbox: false,
      // complete: this.kegiatan.isComplete || false,
      // switch2: false,
      errors: {}
    };
  },
  async beforeRouteLeave(to, from, next) {
    await store.dispatch(KEGIATAN_RESET_STATE);
    next();
  },
  mounted() {
    console.log("this.$route.params");
    console.log(this.$route.params);
    this.isUpdating = this.$route.params.isUpdating;
    this.kegiatan.group = this.$route.params.kegiatan.group;
    this.kegiatan.namaMatkul = this.$route.params.kegiatan.namaMatakuliah;
    this.kegiatan.semester = this.$route.params.kegiatan.semester;
    this.kegiatan.tahunAjaran = this.$route.params.kegiatan.tahunAjaran;
    this.kegiatan.idKegiatan = this.$route.params.kegiatan.idKegiatan;
    this.kegiatan.judulKegiatan = this.$route.params.kegiatan.judulKegiatan;
    this.kegiatan.kegiatan = this.$route.params.kegiatan.isiKegiatan;
    this.kegiatan.tanggalBerakhir = this.$route.params.kegiatan.tanggalBerakhir;
    this.kegiatan.tanngalDibuat = this.$route.params.kegiatan.tanggalDibuat;
    this.kegiatan.isComplete = this.$route.params.kegiatan.isComplete;

    console.log(this.kegiatan);
  },
  methods: {
    onUmumkan() {
      let action = this.isUpdating ? KEGIATAN_UPDATE : KEGIATAN_CREATE;
      console.log(this.kegiatan.isComplete);
      this.$store
        .dispatch(action)
        .then(({ data }) => {
          console.log(data);
          this.$router.push({
            name: "daftarkegiatan", 
            params: {
              group: this.kegiatan.group,
              namaMatakuliah: this.kegiatan.namaMatkul,
              semester: this.kegiatan.semester,
              tahunAjaran: this.kegiatan.tahunAjaran,
              tanggalBerakhir: this.kegiatan.tanggalBerakhir,
              tanggalDibuat: this.kegiatan.tanngalDibuat,
              isComplete:  this.kegiatan.isComplete
            }
          });
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
        });
    },
    onHapusKegiatan() {
      this.$store
        .dispatch(KEGIATAN_DELETE)
        .then(({ data }) => {
          console.log(data);
          this.$router.push({
            name: "daftarkegiatan",
            params: {
              group: this.kegiatan.group,
              namaMatakuliah: this.kegiatan.namaMatkul,
              semester: this.kegiatan.semester,
              tahunAjaran: this.kegiatan.tahunAjaran
            }
          });
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
        });
    }
  },

  computed: {
    ...mapGetters(["kegiatan", "isAuthenticated"])
  }
};
</script>

<style scoped>
 #switch{
   padding-bottom: 0;
 }
</style>
