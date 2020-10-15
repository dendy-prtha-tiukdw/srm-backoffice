<template>
  <div class="col-md-9">
    <div class="feed-toggle">
      <ul class="nav nav-pills outline-active">
        <li class="nav-item">
          <router-link
            :to="{ name: 'home' }"
            exact
            class="nav-link"
            active-class="active"
          >
            Global Feed
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import { mapState, mapGetters } from "vuex";
/* eslint-disable no-console */

export default {
  name: "home",
  // components: {
  //   HelloWorld
  // }
  methods: {},
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    }),
    ...mapGetters(["currentUser", "isAuthenticated"])
  }
};
</script>
