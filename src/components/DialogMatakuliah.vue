<template>
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
                  >Pilih Matakuliah Yang Akan Dipilih</v-list-item-subtitle
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
                      handleClickPilihMatakuliah(matakuliah.namaMatakuliah)
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
</template>

<script>
import { FETCH_DAFTAR_MATAKULIAH } from "@/store/actions.type";
import { mapGetters } from "vuex";
export default {
  name: "dialogMatakuliah",
  data() {
    return {
      namaMatakuliah: "",
      dialog: false,
      dialogEdit: []
    };
  },
  mounted() {
    // console.log(this.$route.params.id);
    // console.log(this.$route.params);
    const daftarMatakuliahRequest = {
      prodi: "Informatika"
    };
    this.$store.dispatch(FETCH_DAFTAR_MATAKULIAH, daftarMatakuliahRequest);
  },
  methods: {
    handleClickPilihMatakuliah(matakuliah) {
      this.kelas.namaMatakuliah = matakuliah;
      this.dialog = false;
    }
  },
  computed: {
    ...mapGetters([
      "kelas",
      "matakuliah",
      "daftarMatakuliah",
      "isAuthenticated"
    ])
  }
};
</script>
