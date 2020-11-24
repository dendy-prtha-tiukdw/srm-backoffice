<template>
  <v-row>
    <v-col cols="8">
      <div class="nik mb-n9 mr-0 ml-4 row">
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
      <div v-for="(nik, idx) in countDosen" :key="idx">
        <!-- idx{{idx}} -->
        <!-- kelas.nik.length{{kelas.nik.length}} -->
        <v-dialog
          v-if="idx === countDosen - 1"
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
                    >Pilih Dosen Yang Akan Dipilih</v-list-item-subtitle
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
                <tr v-for="dosen in daftarDosen" v-bind:key="dosen.prodi">
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
                      >Pilih Dosen Yang Akan Dipilih</v-list-item-subtitle
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
                  <tr v-for="dosen in daftarDosen" v-bind:key="dosen.prodi">
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
</template>

<script>
import { FETCH_DAFTAR_DOSEN } from "@/store/actions.type";
import { mapGetters } from "vuex";
export default {
  name: "dialogDosen",
  data() {
    return {
      countDosen: 1,
      dialog2: false,
      dialogEdit: []
    };
  },
  mounted() {
    // console.log(this.$route.params.id);
    // console.log(this.$route.params);
    const daftarDosenRequest = {
      prodi: "Informatika"
    };
    this.$store.dispatch(FETCH_DAFTAR_DOSEN, daftarDosenRequest);
  },
  methods: {
    handleClickPilihDosen(dosen) {
      this.kelas.nik[this.countDosen - 1] = dosen;
      this.dialog2 = false;
    },
    addDosen() {
      this.countDosen += 1; // ini buat nampilin jumlah field yang ada di kiri
      this.dialogEdit.push(false); // menambahkan status modal baru untuk insert dosen
    },
    insertDosen(idx, dosen) {
      this.dialogEdit[idx] = false;
      this.kelas.nik.splice(idx, 1, dosen);
      //   console.log(this.kelas.nik);
    }
  },
  computed: {
    ...mapGetters(["kelas", "dosen", "daftarDosen", "isAuthenticated"])
  }
};
</script>
