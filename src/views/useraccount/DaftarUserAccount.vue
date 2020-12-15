<template>
  <div class="col-md-9">
    <h2>Pilih Semester & Tahun Ajaran</h2>
    <div class="container">
      <div class="row">
        <div class="col-4 col-sm-4">
          <div class="input-group">
            <select
              class="custom-select"
              id="inputSemester"
              aria-label="Example select with button addon"
              placeholder="Semester"
              v-model="listKelas.semester"
            >
              <option value="Gasal">Gasal</option>
              <option value="Genap">Genap</option>
            </select>
          </div>
        </div>
        <div class="col-4 col-sm-4">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Tahun Ajaran"
              aria-label="Username"
              aria-describedby="basic-addon1"
              v-model="listKelas.tahunAjaran"
            />
          </div>
        </div>
        <div class="col-2 col-sm-2">
          <button
            type="button"
            class="btn btn-outline-success"
            @click="handleViewKelas"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
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
        name: "useraccount",
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
