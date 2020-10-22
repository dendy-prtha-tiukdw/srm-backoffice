<template>
  <div class="col-md-9">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Pengumuman</th>
          <th scope="col">Tanggal Dibuat</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="pengumuman in daftarPengumuman"
          v-bind:key="pengumuman.tanggalInput"
        >
          <td>{{ pengumuman.pengumuman }}</td>
          <td>{{ pengumuman.tanggalInput }}</td>
          <!-- <router-link
            :to="{
              name: 'kelas',
              params: {
                namaMatakuliah: pengumuman.namaMatakuliah,
                group: pengumuman.group,
                semester: pengumuman.semester,
                tahunAjaran: pengumuman.tahunAjaran
              }
            }"
            class="preview-link"
          >
            <td>Detail</td>
          </router-link> -->
        </tr>
      </tbody>
      <button
        class="btn btn-lg btn-info pull-xs-center"
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

import { mapGetters, mapState } from "vuex";
/* eslint-disable no-console */

export default {
  name: "daftarPengumuman",
  data() {
    return {};
  },
  mounted() {
    const daftarPengumumanRequest = {
      group: this.$route.params.group,
      namaMatakuliah: this.$route.params.namaMatakuliah,
      semester: this.$route.params.semester,
      tahunAjaran: this.$route.params.tahunAjaran
    };

    console.log(daftarPengumumanRequest);
    this.$store.dispatch(FETCH_DAFTAR_PENGUMUMAN, daftarPengumumanRequest);
  },
  components: {},
  methods: {
    handleClickTambahPengumuman() {
      this.$router.push({
        name: "tambahpengumuman",
        params: {
          group: this.$route.params.group,
          namaMatakuliah: this.$route.params.namaMatakuliah,
          semester: this.$route.params.semester,
          tahunAjaran: this.$route.params.tahunAjaran
        }
      });
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    }),
    ...mapGetters(["daftarPengumuman", "pengumuman", "isAuthenticated"])
  }
};
</script>
