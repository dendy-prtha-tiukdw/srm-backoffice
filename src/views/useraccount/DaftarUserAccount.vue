<template>
  <div class="col-md-9">
    DAFTAR USER ACCOUNT
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Nama</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(useraccount, idx) in daftarUserAccount" v-bind:key="idx">
          <td>{{ useraccount.idUser }}</td>
          <td>{{ useraccount.nama }}</td>
          <td>{{ useraccount.email }}</td>
          <td>{{ useraccount.role }}</td>
          <RwvRouteTableItem
            :routeName="'edituseraccount'"
            :data="{
              isUpdating: true,
              id: useraccount.idUser,
              nama: useraccount.nama,
              email: useraccount.email,
              role: useraccount.role
            }"
          />
        </tr>
      </tbody>
    </table>
    <button
      class="btn btn-info pull-xs-center"
      @click="handleClickTambahUserAccount"
    >
      Tambah User Account
    </button>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import { FETCH_DAFTAR_USERACCOUNT } from "@/store/actions.type";
import RwvRouteTableItem from "@/components/RouteTableItem";
import { mapGetters, mapState } from "vuex";
/* eslint-disable no-console */

export default {
  name: "daftarkelas",
  components: {
    RwvRouteTableItem
  },
  data() {
    return {
      listDaftarUserAccount: {}
    };
  },
  mounted() {
    this.$store
      .dispatch(FETCH_DAFTAR_USERACCOUNT)
      .then(({ data }) => {
        // console.log(data );
        this.listDaftarUserAccount = data;
      })
      .catch(({ response }) => {
        this.errors = response.data.errors;
      });
  },
  methods: {
    handleClickTambahUserAccount() {
      this.$router.push({
        name: "edituseraccount",
        params: {
          isUpdating: false
        }
      });
    },
    handleGetDaftarUserAccount() {
      this.$store
        .dispatch(FETCH_DAFTAR_USERACCOUNT)
        .then(({ data }) => {
          console.log(data);
          // this.listDaftarUserAccount = data;
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
        });
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    }),
    ...mapGetters(["daftarUserAccount", "isAuthenticated"])
  }
};
</script>
