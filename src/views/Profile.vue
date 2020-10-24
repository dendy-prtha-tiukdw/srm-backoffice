<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.imageUrl" class="user-img" />
            <h4>{{ profile.name }}</h4>
            <p>{{ profile.nomorInduk }}</p>
            <p>{{ profile.email }}</p>
            <p>{{ profile.jenisKelamin }}</p>
            <div v-if="isCurrentUser()">
              <router-link
                class="btn btn-sm btn-outline-secondary action-btn"
                :to="{ name: 'settings' }"
              >
                <i class="ion-gear-a"></i> Edit Profile Settings
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_PROFILE } from "@/store/actions.type";
import JwtService from "@/common/jwt.service";

export default {
  name: "profile",
  props: {
      idToken: {
        type: String,
        default: ""
      }
  },
  components: {},
  created() {},
  beforeRouteEnter(to, from, next) {
    //console.log("before route on kelas ");
    let profileRequest = {
      idToken: JwtService.getIdToken(),
    };
    Promise.all([
      //pProup, pNamaMatakuliah, pSemester, pTahunAjaran
      store.dispatch(FETCH_PROFILE, profileRequest),
      //store.dispatch(FETCH_COMMENTS, to.params.slug)
    ]).then(() => {
      next();
    });
    // console.log(to.params.namaMatakuliah);
    // console.log("to.params.namaMatakuliah");
    next();
  },
  computed: {
    ...mapGetters(["currentUser", "profile", "isAuthenticated"])
  },
  methods: {
    isCurrentUser() {
      if (this.currentUser.name && this.profile.name) {
        return this.currentUser.name === this.profile.username;
      }
      return false;
    },
  },
};
</script>