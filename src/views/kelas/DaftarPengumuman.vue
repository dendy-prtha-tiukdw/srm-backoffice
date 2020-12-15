<template>
  <div class="col-md-9">
    DAFTAR PENGUMUMAN
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Judul</th>
          <th scope="col">Tanggal Dibuat</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="pengumuman in daftarPengumuman"
          v-bind:key="pengumuman.idPengumuman"
        >
          <td>{{ pengumuman.idPengumuman }}</td>
          <td>{{ pengumuman.judulPengumuman }}</td>
          <td>{{ pengumuman.tanggalInput }}</td>
          <RwvRouteTableItem
            :routeName="'editpengumumankelas'"
            :data="{
              isUpdating: true,
              pengumuman: pengumuman
            }"
          />
        </tr>
      </tbody>
      <button
        class="btn btn-info pull-xs-center"
        @click="handleClickTambahPengumuman"
      >
        Tambah Pengumuman
      </button>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import { FETCH_DAFTAR_PENGUMUMAN } from "@/store/actions.type";
import RwvRouteTableItem from "@/components/RouteTableItem";
import { mapGetters, mapState } from "vuex";
/* eslint-disable no-console */

export default {
  name: "daftarpengumumankelas",
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

      const daftarPengumumanRequest = {
        group: this.$route.params.group,
        namaMatakuliah: this.$route.params.namaMatakuliah,
        semester: this.$route.params.semester,
        tahunAjaran: this.$route.params.tahunAjaran
      };
      this.$store.dispatch(FETCH_DAFTAR_PENGUMUMAN, daftarPengumumanRequest);
    }
  },
  components: { RwvRouteTableItem },
  methods: {
    handleClickTambahPengumuman() {
      this.$router.push({
        name: "editpengumumankelas",
        params: {
          isUpdating: false,
          pengumuman: {
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
    ...mapGetters(["daftarPengumuman", "isAuthenticated"])
  }
};
</script>
