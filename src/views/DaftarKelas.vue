<template>
  <div class="col-md-9">
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
        <tr v-for="kelas in daftarKelas" v-bind:key="kelas.namaMatakuliah">
          <td>{{ kelas.namaMatakuliah }}</td>
          <td>{{ kelas.group }}</td>
          <td>{{ kelas.hari }}</td>
          <td>{{ kelas.jam }}</td>
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
  mounted() {
    this.$store.dispatch(FETCH_DAFTAR_KELAS);
  },
  components: {
    RwvRouteTableItem
  },
  methods: {},
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    }),
    ...mapGetters(["daftarKelas", "isAuthenticated"])
  }
};
</script>
