<template>
  <div id="app">
    <RwvHeader />
    <div v-if="isAuthenticated" class="home-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-3">
            <div class="sidebar">
              <p>Menu</p>
              <ul class="sidebar-panel-nav">
                <li><a href="/home">Home</a></li>
                <li><a href="/daftarkelas">Daftar Kelas</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/profile">Profile</a></li> 
              </ul>
            </div>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </div>

    <RwvFooter />
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters } from "vuex";
import RwvHeader from "@/components/TheHeader";
import RwvFooter from "@/components/TheFooter";

export default {
  name: "App",
  components: {
    RwvHeader,
    RwvFooter
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  }
};
</script>
