<template>
  <div class="col-md-9">
    <form @submit.prevent="onUpdate()">
      <fieldset>
        <fieldset class="form-group">
          <h2> Judul Pengumuman </h2>  
          <textarea
            class="form-control" 
            v-model="updateJudulPengumuman"
            rows="8"
            placeholder="Tuliskan judul pengumuman anda"
          >
          </textarea>
          <br>
          <h2> Pengumuman </h2>
          <textarea
            class="form-control"
            rows="8"
            v-model="isiPengumuman"
            placeholder="Tuliskan isi pengumuman Anda"
          >
          </textarea>
        </fieldset>
      </fieldset>
      <button class="btn btn-lg pull-xs-right btn-primary" type="submit">
        Update
      </button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  PENGUMUMAN_UPDATE,
  PENGUMUMAN_RESET_STATE
} from "@/store/actions.type";
import { mapGetters } from "vuex";
import store from "@/store";
/* eslint-disable no-console */

export default {
  data() {
    return {
      updateJudulPengumuman: '',
      isiPengumuman: '',
      errors: {}
    };
  },
  async beforeRouteLeave(to, from, next) {
    await store.dispatch(PENGUMUMAN_RESET_STATE);
    next();
  },
  mounted() {
    this.pengumuman.idPengumuman = this.$route.params.id;
  },
  methods: {
    onUpdate() {
      const pengumuman = {
        idPengumuman: this.$route.params.id,
        judulPengumuman: this.updateJudulPengumuman,
        pengumuman: this.isiPengumuman
      }
      this.$store
        .dispatch(PENGUMUMAN_UPDATE, pengumuman)
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
    ...mapGetters(["judulPengumuman", "pengumuman", "isAuthenticated"])
  }
};
</script>
