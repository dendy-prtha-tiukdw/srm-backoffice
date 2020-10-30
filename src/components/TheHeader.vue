<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <ul v-if="isAuthenticated" class="nav navbar-nav pull-xs-left">
        <!-- <Burger></Burger> -->
      </ul>
      <router-link class="navbar-brand" :to="{ name: 'home' }">
        SRM Backoffice
      </router-link>
      <ul v-if="!isAuthenticated" class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'login' }"
          >
            <i class="ion-compose"></i>Sign in
          </router-link>
        </li>
      </ul>

      <ul v-else class="nav navbar-nav pull-xs-right">
        <!-- <li class="nav-item">
        </li> -->
        <li class="nav-item">
          <button class="btn btn-primary" @click="handleLogOut">
            <i class="ion-log-out"></i>
            Logout
          </button>
        </li>

        <li class="nav-item" v-if="currentUser.name">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{
              name: 'profile',
              params: { username: currentUser.name }
            }"
          >
            {{ currentUser.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGOUT } from "@/store/actions.type";

/* eslint-disable no-console */
export default {
  name: "RwvHeader",
  components: {
    // Sidebar,
    // Burger
  },
  created() {
    // console.log(this.currentUser);
  },
  methods: {
    handleLogOut() {
      this.$store
        .dispatch(LOGOUT)
        .then(() => this.$router.push({ name: "login" }));
    }
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  }
};
</script>
