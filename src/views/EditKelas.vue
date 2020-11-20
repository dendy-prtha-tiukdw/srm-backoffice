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
            <v-col cols="4">
              <div class="dialog mb-n9">
                <v-dialog
                  v-model="dialog"
                  max-width="700px"
                  transition="dialog-bottom-transition"
                >
                  <!-- header dialog -->
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                      Daftar Matakuliah
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar dark color="primary">
                      <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title>Daftar Matakuliah</v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-list three-line subheader>
                      <!-- Isi Dialog -->
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Matakuliah</v-list-item-title>
                          <v-list-item-subtitle
                            >Pilih Matakuliah Yang Akan
                            Dipilih</v-list-item-subtitle
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Kode Matakuliah</th>
                          <th scope="col">Nama Matakuliah</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="matakuliah in daftarMatakuliah"
                          v-bind:key="matakuliah.prodi"
                        >
                          <td>{{ matakuliah.kodeMatakuliah }}</td>
                          <td>{{ matakuliah.namaMatakuliah }}</td>
                          <td>
                            <button
                              class="btn btn-info pull-xs-center"
                              @click="
                                handleClickPilihMatakuliah(
                                  matakuliah.namaMatakuliah
                                )
                              "
                            >
                              Pilih
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <v-list three-line subheader> </v-list>
                  </v-card>
                </v-dialog></div
            ></v-col>

            <!-- ======================================================================================================= -->
            <!-- ============================ DOSEN ================================ -->
            <v-row>
              <v-col cols="8">
                <div class="nik mb-n9 mr-0 ml-3 row">
                  <div
                    v-for="(count, idx) in countDosen"
                    v-bind:key="idx"
                    style="width: 99%; display: inline-block"
                  >
                    <!-- NIK Dosen  -->
                    <v-text-field
                      label="Pilih Dosen"
                      v-model="kelas.nik[idx]"
                      disabled
                      filled
                    >
                    </v-text-field>
                  </div>
                </div>
              </v-col>
              <v-col cols="3">
                <div
                  v-for="(nik, idx) in countDosen"
                  :key="idx"
                >
                <!-- idx{{idx}} -->
                <!-- kelas.nik.length{{kelas.nik.length}} -->
                  <v-dialog
                    v-if="idx === countDosen-1"
                    v-model="dialog2"
                    max-width="700px"
                    transition="dialog-bottom-transition"
                  >
                    <!-- header dialog -->
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="primary" dark v-bind="attrs" v-on="on">
                        Daftar Dosen
                      </v-btn>
                      <v-btn
                        class="mx-2"
                        color="primary"
                        @click="addDosen"
                        fab
                        dark
                        small
                      >
                        <v-icon dark>
                          mdi-plus
                        </v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-toolbar dark color="primary">
                        <v-btn icon dark @click="dialog2 = false">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Daftar Dosen</v-toolbar-title>
                        <v-spacer></v-spacer>
                      </v-toolbar>
                      <v-list three-line subheader>
                        <!-- Isi Dialog Dosen -->
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>Dosen</v-list-item-title>
                            <v-list-item-subtitle
                              >Pilih Dosen Yang Akan
                              Dipilih</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">NIK Dosen</th>
                            <th scope="col">Nama Dosen</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="dosen in daftarDosen"
                            v-bind:key="dosen.prodi"
                          >
                            <td>{{ dosen.nik }}</td>
                            <td>{{ dosen.namaGelar }}</td>
                            <td>
                              <button
                                class="btn btn-info pull-xs-center"
                                @click="handleClickPilihDosen(dosen.nik)"
                              >
                                Pilih
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <v-list three-line subheader> </v-list>
                    </v-card>
                  </v-dialog>
                  <div v-else>
                    <!-- {{idx}} -->
                    <v-dialog
                    :v-model="dialogEdit[idx]"
                    max-width="700px"
                    transition="dialog-bottom-transition"
                  >
                    <!-- header dialog -->
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="primary" dark v-bind="attrs" v-on="on">
                        <v-icon dark>
                          mdi-plus
                        </v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-toolbar dark color="primary">
                        <v-btn icon dark @click="dialogEdit[idx] = false">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Daftar Dosen</v-toolbar-title>
                        <v-spacer></v-spacer>
                      </v-toolbar>
                      <v-list three-line subheader>
                        <!-- Isi Dialog Dosen -->
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>Dosen</v-list-item-title>
                            <v-list-item-subtitle
                              >Pilih Dosen Yang Akan
                              Dipilih</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">NIK Dosen</th>
                            <th scope="col">Nama Dosen</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="dosen in daftarDosen"
                            v-bind:key="dosen.prodi"
                          >
                            <td>{{ dosen.nik }}</td>
                            <td>{{ dosen.namaGelar }}</td>
                            <td>
                              <button
                                class="btn btn-info pull-xs-center"
                                @click="insertDosen(idx, dosen.nik)"
                              >
                                Pilih
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <v-list three-line subheader> </v-list>
                    </v-card>
                  </v-dialog>
                  </div>
                </div>
              </v-col>
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
        <button class="btn btn-primary mb-n9" @click="onUmumkan">
          Buat Kelas
        </button>
        &nbsp;&nbsp;&nbsp;
        <button
          class="btn btn-outline-danger btn-warning"
          v-if="this.isUpdating"
          @click="onHapusKelas"
        >
          <i class="ion-trash-a"></i> <span>&nbsp;Hapus Kelas</span>
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
  FETCH_DAFTAR_MATAKULIAH,
  FETCH_DAFTAR_DOSEN
} from "@/store/actions.type";
import { mapGetters } from "vuex";
import store from "@/store";
/* eslint-disable no-console */

export default {
  name: "editkelas",
  components: {},
  data() {
    return {
      isUpdating: false,
      namaMatakuliah: "",
      countDosen: 1,
      groups: ["A", "B", "C", "D"],
      sesi: ["1", "2", "3", "4"],
      hari: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"],
      semester: ["Gasal", "Genap"],
      dialog: false,
      dialog2: false,
      dialogEdit: [],
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
    console.log(this.kelas)

    const daftarMatakuliahRequest = {
      prodi: "Informatika"
    };
    this.$store.dispatch(FETCH_DAFTAR_MATAKULIAH, daftarMatakuliahRequest);

    const daftarDosenRequest = {
      prodi: "Informatika"
    };
    this.$store.dispatch(FETCH_DAFTAR_DOSEN, daftarDosenRequest);
  },
  methods: {
    handleClickPilihMatakuliah(matakuliah) {
      this.kelas.namaMatakuliah = matakuliah;
      this.dialog = false;
    },
    handleClickPilihDosen(dosen) {
      console.log(this.kelas.nik)
      this.kelas.nik[this.countDosen-1] = dosen;
      this.dialog2 = false;
    },
    addDosen() {
      this.countDosen+=1 // ini buat nampilin jumlah field yang ada di kiri
      this.dialogEdit.push(false) // menambahkan status modal baru untuk insert dosen
    },
    insertDosen (idx, dosen) {
      console.log(this.dialogEdit)
      this.dialogEdit[idx] = false;
      this.kelas.nik.splice(idx, 1, dosen);
      console.log(this.kelas.nik)
    },
    onUmumkan() {
      console.log(this.nikDosen);
      let action = this.isUpdating ? KELAS_UPDATE : KELAS_CREATE;
      this.$store
        .dispatch(action)
        .then(({ data }) => {
          console.log(data);
          this.$router.push({
            name: "daftarkelas"
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
      "isAuthenticated"
    ])
  }
};
</script>
