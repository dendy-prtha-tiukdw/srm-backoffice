<template>
  <div class="col-md-9">
    DAFTAR KEGIATAN
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Judul</th>
          <th scope="col">Tanggal Dibuat</th>
          <th scope="col">Tanggal Berakhir</th>
          <th scope="col">Kegiatan Sudah Selesai?</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="kegiatan in daftarKegiatan"
          v-bind:key="kegiatan.idKegiatan"
        >
          <td>{{ kegiatan.idKegiatan}}</td>
          <td>{{ kegiatan.judulKegiatan }}</td>
          <td>{{ kegiatan.tanggalDibuat }}</td>
          <td>{{ kegiatan.tanggalBerakhir }}</td>
          <td>{{ kegiatan.complete }}</td>
          <RwvRouteTableItem
            :routeName="'editkegiatan'"
            :data="{
              isUpdating: true,
              kegiatan: kegiatan
            }"
          />
        </tr>
      </tbody>
      <button
        class="btn btn-info pull-xs-center"
        @click="handleClickTambahKegiatan"
      >
        Tambah Kegiatan
      </button>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import { FETCH_DAFTAR_KEGIATAN } from "@/store/actions.type";
import RwvRouteTableItem from "@/components/RouteTableItem";
import { mapGetters, mapState } from "vuex";
/* eslint-disable no-console */

export default {
  name: "daftarKegiatan",
  data() {
    return {
      group: "",
      namaMatakuliah: "",
      semester: "",
      tahunAjaran: ""
    };
  },
  mounted() {
    if (this.$route.params.namaMatakuliah != null) {
      this.group = this.$route.params.group;
      this.namaMatakuliah = this.$route.params.namaMatakuliah;
      this.semester = this.$route.params.semester;
      this.tahunAjaran = this.$route.params.semester;

      const daftarKegiatanRequest = {
        group: this.$route.params.group,
        namaMatakuliah: this.$route.params.namaMatakuliah,
        semester: this.$route.params.semester,
        tahunAjaran: this.$route.params.tahunAjaran
      };
      this.$store.dispatch(FETCH_DAFTAR_KEGIATAN, daftarKegiatanRequest);
    }
  },
  components: { RwvRouteTableItem },
  methods: {
    handleClickTambahKegiatan() {
      this.$router.push({
        name: "editkegiatan",
        params: {
          isUpdating: false,
          kegiatan: {
            group: this.$route.params.group,
            namaMatakuliah: this.$route.params.namaMatakuliah,
            semester: this.$route.params.semester,
            tahunAjaran: this.$route.params.tahunAjaran
          }
        }
      });
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    }),
    ...mapGetters(["daftarKegiatan", "isAuthenticated"])
  }
};
</script>
