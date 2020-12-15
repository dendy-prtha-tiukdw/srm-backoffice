<template>
  <div class="col-3 col-sm-3">
    <transition name="modal">
      <div class="modal-mask scroll-content">
        <div class="modal-wrapper m-x-auto">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Daftar Matakuliah</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span
                    aria-hidden="true"
                    @click="handleClickPilihMatakuliah(null)"
                    >&times;</span
                  >
                </button>
              </div>
              <div class="modal-body">
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
                          @click="handleClickPilihMatakuliah(matakuliah)"
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
import { FETCH_DAFTAR_MATAKULIAH } from "@/store/actions.type";
import { mapGetters } from "vuex";
export default {
  name: "dialogMatakuliah",
  data() {
    return {
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
    handleClickPilihMatakuliah(selectedMatakuliah) {
      this.$emit("selectedMatakuliah", selectedMatakuliah);
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
