<template>
  <div class="col-9 col-sm-9">
    <!-- Bagian Matakuliah -->
    <div class="row">
      <div class="col-9 col-sm-9">
        <input
          type="text"
          :readonly="true"
          class="form-control"
          placeholder="Nama Matakuliah"
          aria-label="Username"
          aria-describedby="basic-addon1"
          v-model="kelas.namaMatakuliah"
        />
      </div>
      <DialogMatakuliah
        v-show="isModalMakulVisible"
        @selectedMatakuliah="closeModalDaftarMakul"
      />
      <div class="col-3 col-sm-3">
        <button class="btn btn-primary btn-block" @click="showModalDaftarMakul">
          Cari Matakuliah
        </button>
      </div>
    </div>
    <!-- Bagian Dosen 
    terdapat 4 dosen yg boleh mengajar dalam 1 kelas-->
    <div class="row">
      <div class="col-9 col-sm-9">
        <input
          type="text"
          :readonly="true"
          class="form-control"
          placeholder="NIK Dosen 1"
          aria-label="Username"
          aria-describedby="basic-addon1"
          v-model="kelas.nik[0]"
        />
      </div>
      <DialogDosen
        v-show="isModalDosen1Visible"
        @selectedDosen="closeModalDosen1"
      >
      </DialogDosen>
      <div class="col-3 col-sm-3">
        <button class="btn btn-primary btn-block" @click="showModalDosen1">
          Cari Dosen
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-9 col-sm-9">
        <input
          type="text"
          :readonly="true"
          class="form-control"
          placeholder="NIK Dosen 2"
          aria-label="Username"
          aria-describedby="basic-addon1"
          v-model="kelas.nik[1]"
        />
      </div>
      <DialogDosen
        v-show="isModalDosen2Visible"
        @selectedDosen="closeModalDosen2"
      >
      </DialogDosen>
      <div class="col-3 col-sm-3">
        <button class="btn btn-primary btn-block" @click="showModalDosen2">
          Cari Dosen
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-9 col-sm-9">
        <input
          type="text"
          :readonly="true"
          class="form-control"
          placeholder="NIK Dosen 3"
          aria-label="Username"
          aria-describedby="basic-addon1"
          v-model="kelas.nik[2]"
        />
      </div>
      <DialogDosen
        v-show="isModalDosen3Visible"
        @selectedDosen="closeModalDosen3"
      >
      </DialogDosen>
      <div class="col-3 col-sm-3">
        <button class="btn btn-primary btn-block" @click="showModalDosen3">
          Cari Dosen
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-9 col-sm-9">
        <input
          type="text"
          :readonly="true"
          class="form-control"
          placeholder="NIK Dosen 4"
          aria-label="Username"
          aria-describedby="basic-addon1"
          v-model="kelas.nik[3]"
        />
      </div>
      <DialogDosen
        v-show="isModalDosen4Visible"
        @selectedDosen="closeModalDosen4"
      >
      </DialogDosen>
      <div class="col-3 col-sm-3">
        <button class="btn btn-primary btn-block" @click="showModalDosen4">
          Cari Dosen
        </button>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-sm-12 px-md-5" style="margin-bottom: -30px">
        <div class="row mx-mb-n5">
          <div class="col-3 col-sm-3"><span>Hari:</span></div>
          <div class="col-3 col-sm-3"><span>Sesi:</span></div>
          <div class="col-3 col-sm-3"><span>Group:</span></div>
          <div class="col-3 col-sm-3"><span>Semester:</span></div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-3 col-sm-3">
        <select class="custom-select col-12 w-100" v-model="kelas.hari">
          <option value="Senin">Senin</option>
          <option value="Selasa">Selasa</option>
          <option value="Rabu">Rabu</option>
          <option value="Kamis">Kamis</option>
          <option value="Jumat">Jumat</option>
        </select>
      </div>
      <div class="col-3 col-sm-3">
        <select class="custom-select col-12 w-100" v-model="kelas.sesi">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <div class="col-3 col-sm-3">
        <select class="custom-select col-12 w-100" v-model="kelas.group">
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </div>
      <div class="col-3 col-sm-3">
        <select class="custom-select col-12 w-100" v-model="kelas.semester">
          <option value="Gasal">Gasal</option>
          <option value="Genap">Genap</option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-sm-12">
        <input
          type="text"
          class="form-control"
          placeholder="Tahun Ajaran"
          aria-label="Username"
          aria-describedby="basic-addon1"
          v-model="kelas.tahunAjaran"
        />
      </div>
    </div>

    <div v-if="!isUpdating" class="row">
      <div class="col-6 col-sm-6">
        <button
          type="button"
          class="btn btn-primary btn-md btn-block"
          @click="onUmumkan"
          style="color: white"
        >
          Buat Kelas
        </button>
      </div>
      <div class="col-6 col-sm-6">
        <button
          type="button"
          class="btn btn-danger btn-md btn-block"
          @click="batalCreate"
        >
          Batal
        </button>
      </div>
    </div>

    <div v-else-if="isUpdating" class="row">
      <div class="col-6 col-sm-6">
        <button
          type="button"
          class="btn btn-primary btn-md btn-block"
          @click="onUmumkan"
          style="color: white"
        >
          Update Kelas
        </button>
      </div>
      <div class="col-6 col-sm-6">
        <button
          type="button"
          class="btn btn-danger btn-md btn-block"
          @click="batalUpdate"
        >
          Batal
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  KELAS_CREATE,
  KELAS_UPDATE,
  KELAS_RESET_STATE
} from "@/store/actions.type";
import { mapGetters } from "vuex";
import store from "@/store";
import DialogMatakuliah from "@/components/DialogMatakuliah.vue";
import DialogDosen from "@/components/DialogDosen.vue";
/* eslint-disable no-console */

export default {
  name: "editkelas",
  components: { DialogMatakuliah, DialogDosen },
  data() {
    return {
      isModalMakulVisible: false,
      isModalDosen1Visible: false,
      isModalDosen2Visible: false,
      isModalDosen3Visible: false,
      isModalDosen4Visible: false,
      namaMatakuliah: "",
      countDosen: 1,
      groups: ["A", "B", "C", "D"],
      sesi: ["1", "2", "3", "4"],
      hari: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"],
      semester: ["Gasal", "Genap"],
      dialog: false,
      dialog2: false,
      dialogEdit: [],
      isUpdating: false,
      errors: {}
    };
  },
  mounted() {
    console.log(this.kelas);

    this.isUpdating = this.$route.params.isUpdating;
  },
  async created() {
    await store.dispatch(KELAS_RESET_STATE);
    if (this.$route.params.detailKelas != null) {
      this.kelas.namaMatakuliah = this.$route.params.detailKelas.namaMatakuliah;
      this.kelas.group = this.$route.params.detailKelas.group;
      this.kelas.semester = this.$route.params.detailKelas.semester;
      this.kelas.tahunAjaran = this.$route.params.detailKelas.tahunAjaran;
      this.kelas.sesi = this.$route.params.detailKelas.sesi;
      this.kelas.hari = this.$route.params.detailKelas.hari;
    }
  },
  methods: {
    setData() {
      this.updateKelas.newData.group = this.kelas.group;
      this.updateKelas.newData.hari = this.kelas.hari;
      this.updateKelas.newData.namaMatakuliah = this.kelas.namaMatakuliah;
      this.updateKelas.newData.nik = this.kelas.nik;
      this.updateKelas.newData.semester = this.kelas.semester;
      this.updateKelas.newData.sesi = this.kelas.sesi;
      this.updateKelas.newData.tahunAjaran = this.kelas.tahunAjaran;
      this.updateKelas.newData.group = this.kelas.group;

      this.updateKelas.request.group = this.$route.params.detailKelas.group;
      this.updateKelas.request.namaMatakuliah = this.$route.params.detailKelas.namaMatakuliah;
      this.updateKelas.request.semester = this.$route.params.detailKelas.semester;
      this.updateKelas.request.tahunAjaran = this.$route.params.detailKelas.tahunAjaran;
      console.log(this.kelas);
      console.log(this.$route.params.detailKelas);
      console.log(this.updateKelas);
    },
    onUmumkan() {
      let action = this.isUpdating ? KELAS_UPDATE : KELAS_CREATE;
      if (this.isUpdating) this.setData();
      this.$store
        .dispatch(action)
        .then(() => {
          this.$router.push({
            name: "daftarkelas"
          });
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
        });
    },
    showModalDaftarMakul() {
      this.isModalMakulVisible = true;
    },
    closeModalDaftarMakul(selectedMakul) {
      this.kelas.namaMatakuliah = "";
      if (selectedMakul != null) {
        this.kelas.namaMatakuliah = selectedMakul.namaMatakuliah;
      }
      this.isModalMakulVisible = false;
    },
    showModalDosen1() {
      this.isModalDosen1Visible = true;
    },
    closeModalDosen1(selectedDosen) {
      this.kelas.nik[0] = "";
      if (selectedDosen != null) {
        this.kelas.nik[0] = selectedDosen.nik;
      }
      this.isModalDosen1Visible = false;
    },
    showModalDosen2() {
      this.isModalDosen2Visible = true;
    },
    closeModalDosen2(selectedDosen) {
      this.kelas.nik[1] = "";
      if (selectedDosen != null) {
        this.kelas.nik[1] = selectedDosen.nik;
      }
      this.isModalDosen2Visible = false;
    },
    showModalDosen3() {
      this.isModalDosen3Visible = true;
    },
    closeModalDosen3(selectedDosen) {
      this.kelas.nik[2] = "";
      if (selectedDosen != null) {
        this.kelas.nik[2] = selectedDosen.nik;
      }
      this.isModalDosen3Visible = false;
    },
    showModalDosen4() {
      this.isModalDosen4Visible = true;
    },
    closeModalDosen4(selectedDosen) {
      this.kelas.nik[3] = "";
      if (selectedDosen != null) {
        this.kelas.nik[3] = selectedDosen.nik;
      }
      this.isModalDosen4Visible = false;
    },
    batalUpdate() {
      this.$router.push({
        name: "kelas"
      });
    },
    batalCreate() {
      this.$router.push({
        name: "daftarkelas"
      });
    }
  },

  computed: {
    ...mapGetters([
      "kelas",
      "matakuliah",
      "dosen",
      "daftarMatakuliah",
      "daftarDosen",
      "isAuthenticated",
      "updateKelas"
    ])
  }
};
</script>
