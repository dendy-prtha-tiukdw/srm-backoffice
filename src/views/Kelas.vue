<template>
  <div class="col-md-9">
    DETAIL KELAS
    <table class="table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="col">Nama Matakuliah :</th>
          <td>{{ detailKelas.namaMatakuliah }}</td>
        </tr>
        <tr>
          <th scope="col">Group:</th>
          <td>{{ detailKelas.group }}</td>
        </tr>
        <tr>
          <th scope="col">Dosen :</th>
          <td>
            <div v-for="dosen in detailKelas.namaDosen" v-bind:key="dosen">
              {{ dosen }}
            </div>
          </td>
        </tr>
        <tr>
          <th scope="col">Waktu :</th>
          <td>{{ detailKelas.hari }} pukul {{ detailKelas.sesi }}</td>
        </tr>
        <tr>
          <th scope="col">Periode :</th>
          <td>{{ detailKelas.semester }} {{ detailKelas.tahunAjaran }}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <button
        class="btn btn-info pull-xs-center"
        @click="handleClickListPengumuman"
      >
        Daftar Pengumuman
      </button>
      &nbsp;&nbsp;&nbsp;
      <button
        class="btn btn-info pull-xs-center"
        @click="handleClickListKegiatan"
      >
        Daftar Kegiatan
      </button>
      &nbsp;&nbsp;&nbsp;
      <RwvRouteUpdate
        :routeName="'editkelas'"
        :data="{
          isUpdating: true,
          detailKelas: detailKelas
        }"
      />
      &nbsp;&nbsp;&nbsp;
      <button
        class="btn btn-outline-danger btn-warning hapuskelas"
        @click="onHapusKelas"
      >
        <i class="ion-trash-a"></i> <span>&nbsp;Hapus Kelas</span>
      </button>
    </div>
    <br />
    Peserta Kuliah
    <table class="table">
      <thead>
        <tr>
          <th scope="col">NIM</th>
          <th scope="col">NAMA</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mahasiswa in pesertaKelas" v-bind:key="mahasiswa.nim">
          <td>{{ mahasiswa.nim }}</td>
          <td>{{ mahasiswa.nama }}</td>
          <td>
            <button
              class="btn btn-outline-danger btn-warning hapuskelas"
              @click="onHapusPeserta(mahasiswa.nim)"
            >
              <i class="ion-trash-a"></i> <span>&nbsp;Hapus</span>
            </button>
          </td>
        </tr>
      </tbody>
      <button class="btn btn-info pull-xs-center" @click="onCreatePeserta">
        Tambah Mahasiswa
      </button>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import marked from "marked";
/* eslint-disable no-console */
import store from "@/store";
import {
  FETCH_DETAIL_KELAS,
  FETCH_PESERTA_KELAS,
  KELAS_DELETE,
  PESERTA_KELAS_DELETE
} from "@/store/actions.type";
import RwvRouteUpdate from "@/components/RouteUpdate";

export default {
  name: "kelas",
  props: {
    namaMatakuliah: String,
    group: String,
    semester: String,
    tahunAjaran: String,
    sesi: String,
    hari: String
  },

  components: { RwvRouteUpdate },
  created() {},
  beforeRouteEnter(to, from, next) {
    let detailKelasRequest = {
      group: to.params.group,
      namaMatakuliah: to.params.namaMatakuliah,
      semester: to.params.semester,
      tahunAjaran: to.params.tahunAjaran
    };

    Promise.all([
      //pProup, pNamaMatakuliah, pSemester, pTahunAjaran
      store.dispatch(FETCH_DETAIL_KELAS, detailKelasRequest),
      store.dispatch(FETCH_PESERTA_KELAS, detailKelasRequest)
    ]).then(() => {
      next();
    });
    next();
  },
  computed: {
    ...mapGetters([
      "detailKelas",
      "pesertaKelas",
      "deletePeserta",
      "createPeserta",
      "currentUser",
      "isAuthenticated"
    ])
  },
  methods: {
    parseMarkdown(content) {
      return marked(content);
    },
    handleClickListPengumuman() {
      this.$router.push({
        name: "daftarpengumuman",
        params: {
          group: this.detailKelas.group,
          namaMatakuliah: this.detailKelas.namaMatakuliah,
          semester: this.detailKelas.semester,
          tahunAjaran: this.detailKelas.tahunAjaran
        }
      });
    },
    handleClickListKegiatan() {
      this.$router.push({
        name: "daftarkegiatan",
        params: {
          group: this.detailKelas.group,
          namaMatakuliah: this.detailKelas.namaMatakuliah,
          semester: this.detailKelas.semester,
          tahunAjaran: this.detailKelas.tahunAjaran
        }
      });
    },
    onHapusKelas() {
      this.$store
        .dispatch(KELAS_DELETE)
        .then(({ data }) => {
          console.log(data);
          this.$router.push({
            name: "daftarkelas",
            params: {
              group: this.detailKelas.group,
              namaMatakuliah: this.detailKelas.namaMatakuliah,
              semester: this.detailKelas.semester,
              tahunAjaran: this.detailKelas.tahunAjaran
            }
          });
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
        });
    },
    onUpdateKelas() {
      this.$router.push({
        isUpdating: true,
        name: "editkelas",
        params: {
          group: this.detailKelas.group,
          namaMatakuliah: this.detailKelas.namaMatakuliah,
          semester: this.detailKelas.semester,
          tahunAjaran: this.detailKelas.tahunAjaran,
          sesi: this.detailKelas.sesi,
          hari: this.detailKelas.hari
        }
      });
    },
    onCreatePeserta() {
      this.$router.push({
        isUpdating: true,
        name: "editpeserta",
        params: {
          group: this.detailKelas.group,
          namaMatakuliah: this.detailKelas.namaMatakuliah,
          semester: this.detailKelas.semester,
          tahunAjaran: this.detailKelas.tahunAjaran
        }
      });
    },
    onHapusPeserta(nimPeserta) {
      const pesertaRequest = {
        namaMatakuliah: this.detailKelas.namaMatakuliah,
        nim: nimPeserta,
        semester: this.detailKelas.semester,
        tahunAjaran: this.detailKelas.tahunAjaran
      };
      console.log(pesertaRequest);
      let detailKelasRequest = {
        group: this.$route.params.group,
        namaMatakuliah: this.$route.params.namaMatakuliah,
        semester: this.$route.params.semester,
        tahunAjaran: this.$route.params.tahunAjaran
      };
      this.$store
        .dispatch(PESERTA_KELAS_DELETE, pesertaRequest)
        .then(() => {
          //pProup, pNamaMatakuliah, pSemester, pTahunAjaran
          store.dispatch(FETCH_DETAIL_KELAS, detailKelasRequest),
            store.dispatch(FETCH_PESERTA_KELAS, detailKelasRequest);
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
        });
    }
  }
};
</script>
