<template>
  <div class="col-md-9">
    <form @submit.prevent="onUmumkan()">
      <fieldset>
        <fieldset class="form-group">
          <textarea
            class="form-control"
            rows="8"
            v-model="pengumuman.pengumuman"
            placeholder="Tuliskan isi pengumuman Anda"
          >
          </textarea>
        </fieldset>
      </fieldset>
      <button class="btn btn-lg pull-xs-right btn-primary" type="submit">
        Umumkan
      </button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  PENGUMUMAN_CREATE,
  PENGUMUMAN_RESET_STATE
} from "@/store/actions.type";
import { mapGetters } from "vuex";
import store from "@/store";
/* eslint-disable no-console */

export default {
  name: "tambahpengumuman",
  data() {
    return {
      errors: {}
    };
  },
  async beforeRouteLeave(to, from, next) {
    await store.dispatch(PENGUMUMAN_RESET_STATE);
    next();
  },
  mounted() {
    this.pengumuman.group = this.$route.params.group;
    this.pengumuman.namaMatkul = this.$route.params.namaMatakuliah;
    this.pengumuman.semester = this.$route.params.semester;
    this.pengumuman.tahunAjaran = this.$route.params.tahunAjaran;
  },
  methods: {
    onUmumkan() {
      this.$store
        .dispatch(PENGUMUMAN_CREATE)
        .then(({ data }) => {
          console.log(data);
          this.$router.push({
            name: "daftarkelas"
          });
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
        });
    }
  },
  computed: {
    ...mapGetters(["pengumuman", "isAuthenticated"])
  }
};
</script>
