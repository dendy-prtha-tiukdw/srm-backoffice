<template>
  <div class="col-3 col-sm-3">
    <transition name="modal">
      <div class="modal-mask scroll-content">
        <div class="modal-wrapper m-x-auto">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Daftar Dosen</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true" @click="handleClickPilihDosen(null)"
                    >&times;</span
                  >
                </button>
              </div>
              <div class="modal-body">
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
                          @click="handleClickPilihDosen(dosen)"
                        >
                          Pilih
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="modal-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { FETCH_DAFTAR_DOSEN } from "@/store/actions.type";
import { mapGetters } from "vuex";
export default {
  name: "dialogDosen",
  data() {
    return {
      countDosen: 1,
      showModal: false,
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
      // this.kelas.nik[this.countDosen - 1] = dosen;
      // this.showModal = false;
      this.$emit("selectedDosen", dosen);
      console.log("child modal" + dosen);
    }
  },
  computed: {
    ...mapGetters(["kelas", "dosen", "daftarDosen", "isAuthenticated"])
  }
};
</script>
