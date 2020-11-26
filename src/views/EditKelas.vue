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
                ,
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
        <button class="btn btn-primary mb-n9" @click="onUmumkan">
          Buat Kelas
        </button>
        &nbsp;&nbsp;&nbsp;
      </fieldset>
    </div>
  </v-app>
</template>

<script>
// @ is an alias to /src
import {
  KELAS_CREATE,
  KELAS_UPDATE,
  KELAS_RESET_STATE
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
  mounted() {
    // console.log(this.$route.params.id);
    // console.log(this.$route.params);
    console.log(this.kelas);

    this.isUpdating = this.$route.params.isUpdating;
  },
  async created() {
    await store.dispatch(KELAS_RESET_STATE);
  },
  methods: {
    setData() {
      this.updateKelas.newData.group = this.kelas.group;
      this.updateKelas.newData.hari = this.kelas.hari;
      this.updateKelas.newData.namaMatakuliah = this.kelas.namaMatakuliah;
      this.updateKelas.newData.nik = this.kelas.nik;
      this.updateKelas.newData.semester = this.kelas.semester;
      this.updateKelas.newData.sesi = this.kelas.sesi;
      this.updateKelas.newData.tahunAjaran = this.kelas.tahunAjaran;
      this.updateKelas.newData.group = this.kelas.group;

      this.updateKelas.request.group = this.$route.params.detailKelas.group;
      this.updateKelas.request.namaMatakuliah = this.$route.params.detailKelas.namaMatakuliah;
      this.updateKelas.request.semester = this.$route.params.detailKelas.semester;
      this.updateKelas.request.tahunAjaran = this.$route.params.detailKelas.tahunAjaran;
      console.log(this.kelas);
      console.log(this.$route.params.detailKelas);
      console.log(this.updateKelas);
    },
    onUmumkan() {
      let action = this.isUpdating ? KELAS_UPDATE : KELAS_CREATE;
      if (this.isUpdating) this.setData();
      this.$store
        .dispatch(action)
        .then(() => {
          this.$router.push({
            name: "daftarkelas"
          });
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
        });
    },
    
  },

  computed: {
    ...mapGetters([
      "kelas",
      "matakuliah",
      "dosen",
      "daftarMatakuliah",
      "daftarDosen",
      "isAuthenticated",
      "updateKelas"
    ])
  }
};
</script>
