<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import { mapState } from "vuex";
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
    })
  }
};
</script>
