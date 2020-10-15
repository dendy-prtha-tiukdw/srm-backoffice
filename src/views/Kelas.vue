<template>
  <div class="col-md-9">
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
    Peserta Kuliah
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import marked from "marked";
/* eslint-disable no-console */
import store from "@/store";
import { FETCH_DETAIL_KELAS } from "@/store/actions.type";

export default {
  name: "kelas",
  props: {
    namaMatakuliah: String,
    group: String,
    semester: String,
    tahunAjaran: String
  },
  components: {},
  created() {},
  beforeRouteEnter(to, from, next) {
    //console.log("before route on kelas ");
    let detailKelasRequest = {
      group: to.params.group,
      namaMatakuliah: to.params.namaMatakuliah,
      semester: to.params.semester,
      tahunAjaran: to.params.tahunAjaran
    };
    Promise.all([
      //pProup, pNamaMatakuliah, pSemester, pTahunAjaran
      store.dispatch(FETCH_DETAIL_KELAS, detailKelasRequest)
      //store.dispatch(FETCH_COMMENTS, to.params.slug)
    ]).then(() => {
      next();
    });
    // console.log(to.params.namaMatakuliah);
    // console.log("to.params.namaMatakuliah");
    next();
  },
  computed: {
    ...mapGetters(["detailKelas", "currentUser", "isAuthenticated"])
  },
  methods: {
    parseMarkdown(content) {
      return marked(content);
    }
  }
};
</script>
