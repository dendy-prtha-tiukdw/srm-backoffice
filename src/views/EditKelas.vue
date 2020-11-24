<template>
  <v-app>
    <div class="mb-n16 mt-n3 ">
      <fieldset>
        <v-container fluid>
          <v-row>
            <!-- Nama Matakuliah -->
            <v-col cols="8">
              <div class="namaMatakuliah mb-n9">
                <v-text-field
                  label="Pilih Matakuliah"
                  v-model="kelas.namaMatakuliah"
                  disabled
                  filled
                >
                </v-text-field>
              </div>
            </v-col>
            <!-- Dialog Pilih Matakuliah -->
            <DialogMatakuliah />

            <!-- ============================ DOSEN ================================ -->
            <v-row>
              <!-- Dialog Pilih Dosen -->
              <DialogDosen />
            </v-row>
          </v-row>

          <v-row>
            <!-- Hari Matakuliah -->
            <v-col cols="4">
              <div class="mb-n9">
                <div class="mr-0">
                  <v-combobox
                    v-model="kelas.hari"
                    :items="hari"
                    auto-select-first
                    clearable
                    filled
                    label="Pilih Hari Matakuliah"
                  ></v-combobox>
                </div>
              </div>
            </v-col>
            <!-- Group Kelas -->
            <v-col cols="4">
              <div class="group mb-n9">
                <v-combobox
                  v-model="kelas.group"
                  :items="groups"
                  clearable
                  filled
                  hide-selected
                  label="Grup Matakuliah"
                ></v-combobox>
              </div>
            </v-col>
            <!-- Sesi Matakuliah -->
            <v-col cols="4">
              <div class="sesi mb-n9">
                <v-combobox
                  v-model="kelas.sesi"
                  :items="sesi"
                  auto-select-first
                  clearable
                  filled
                  label="Pilih Sesi Matakuliah"
                ></v-combobox>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <!-- Semester -->
            <v-col cols="6">
              <div class="mb-n9">
                <v-combobox
                  v-model="kelas.semester"
                  :items="semester"
                  clearable
                  filled
                  label="Semester"
                ></v-combobox>
              </div>
              <!-- Periode -->
            </v-col>
            <v-col cols="6">
              <div class="mb-n9">
                <v-text-field
                  label="Masukan Periode Matakuliah"
                  v-model="kelas.tahunAjaran"
                  filled
                >
                </v-text-field>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <button class="btn btn-primary mb-n9"
         @click="onUmumkan">
          Buat Kelas
        </button>
         &nbsp;&nbsp;&nbsp;
        <button
          class="btn btn-outline-info danger btn-warning"
          v-if="this.isUpdating"
          @click="onUmumkan"
        >
          <i class="ion-trash-a"></i> <span>&nbsp;Update Pengumuman</span>
        </button>
      </fieldset>
    </div>
  </v-app>
</template>

<script>
// @ is an alias to /src
import {
  KELAS_CREATE,
  KELAS_UPDATE,
  KELAS_RESET_STATE,
} from "@/store/actions.type";
import { mapGetters } from "vuex";
import store from "@/store";
import DialogMatakuliah from "../components/DialogMatakuliah.vue";
import DialogDosen from "../components/DialogDosen.vue";
/* eslint-disable no-console */

export default {
  name: "editkelas",
  components: { DialogMatakuliah, DialogDosen },
  data() {
    return {
      namaMatakuliah: "",
      countDosen: 1,
      groups: ["A", "B", "C", "D"],
      sesi: ["1", "2", "3", "4"],
      hari: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"],
      semester: ["Gasal", "Genap"],
      dialog: false,
      dialog2: false,
      dialogEdit: [],
      isUpdating: false,
      errors: {}
    };
  },
  async beforeRouteLeave(to, from, next) {
    await store.dispatch(KELAS_RESET_STATE);
    next();
  },
  mounted() {
    // console.log(this.$route.params.id);
    // console.log(this.$route.params);
    console.log(this.kelas);

    this.isUpdating = this.$route.params.isUpdating;
  },
  methods: {
    onUmumkan() {
      let action = this.isUpdating ? KELAS_UPDATE : KELAS_CREATE;
      this.$store
        .dispatch(action)
        .then(({ data }) => {
          console.log(data);
          this.$router.push({
            name: "daftarkelas",
          });
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
        });
    }
    // tambahNikDosen(){
    //   this.kelas.nik.push({ value: '' });
    // },
  },

  computed: {
    ...mapGetters([
      "kelas",
      "matakuliah",
      "dosen",
      "daftarMatakuliah",
      "daftarDosen",
      "isAuthenticated",
      "updateKelas",
    ])
  }
};
</script>
