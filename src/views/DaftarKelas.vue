<template>
  <div class="col-md-9">
    <h2>Pilih Semester & Tahun Ajaran</h2>
    <v-container fluid>
      <div class="mb-n9">
        <v-row>
          <v-col cols="12" sm="1" md="2">
            <v-text-field
              label="Semester"
              v-model="listKelas.semester"
              solo
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="2">
            <v-text-field
              label="Tahun Ajaran"
              v-model="listKelas.tahunAjaran"
              solo
            ></v-text-field>
          </v-col>
          <v-col>
            <v-btn color="warning" @click="handleViewKelas" dark>
              Submit
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-container>
    DAFTAR KELAS
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Mata Kuliah</th>
          <th scope="col">Group</th>
          <th scope="col">Hari</th>
          <th scope="col">Jam</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(kelas, idx) in listOfKelas" v-bind:key="idx">
          <td>{{ kelas.namaMatakuliah }}</td>
          <td>{{ kelas.group }}</td>
          <td>{{ kelas.hari }}</td>
          <td>{{ kelas.sesi }}</td>
          <RwvRouteTableItem
            :routeName="'kelas'"
            :data="{
              namaMatakuliah: kelas.namaMatakuliah,
              group: kelas.group,
              semester: kelas.semester,
              tahunAjaran: kelas.tahunAjaran
            }"
          />
        </tr>
      </tbody>
    </table>
    <button class="btn btn-info pull-xs-center" @click="handleClickTambahKelas">
      Tambah Kelas
    </button>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import { FETCH_DAFTAR_KELAS } from "@/store/actions.type";
import RwvRouteTableItem from "@/components/RouteTableItem";
import { mapGetters, mapState } from "vuex";
/* eslint-disable no-console */

export default {
  name: "daftarkelas",
  components: {
    RwvRouteTableItem
  },
  data() {
    return {
      listOfKelas: {}
    };
  },
  methods: {
    handleClickTambahKelas() {
      this.$router.push({
        name: "editkelas",
        params: {
          isUpdating: false,
          kelas: {
            group: this.$route.params.group,
            namaMatakuliah: this.$route.params.namaMatakuliah,
            semester: this.$route.params.semester,
            tahunAjaran: this.$route.params.tahunAjaran
          },
          matakuliah: {
            prodi: this.$route.params.prodi
          }
        }
      });
    },
    handleViewKelas() {
      this.$store
        .dispatch(FETCH_DAFTAR_KELAS)
        .then(({ data }) => {
          console.log(data);
          this.listOfKelas = data;
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
        });
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    }),
    ...mapGetters(["listKelas", "daftarKelas", "kelas", "isAuthenticated"])
  }
};
</script>
