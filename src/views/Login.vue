<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <button
            class="btn btn-lg btn-primary pull-xs-center"
            @click="handleClickLogin"
            :disabled="!gAuthReady"
          >
            Sign in Using Google
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { LOGIN } from "@/store/actions.type";
/* eslint-disable no-console */
export default {
  name: "RwvLogin",
  data() {
    return {
      gAuthReady: false,
      email: null,
      password: null
    };
  },
  created() {
    let that = this;
    let checkGauthLoad = setInterval(function() {
      that.gAuthReady = that.$gAuth.isInit;
      //that.isSignIn = that.$gAuth.isAuthorized;
      if (that.isInit) clearInterval(checkGauthLoad);
    }, 1000);
  },
  methods: {
    handleClickLogin() {
      this.$gAuth
        .getAuthCode()
        .then(authCode => {
          console.log(authCode);
          this.$store
            .dispatch(LOGIN, authCode)
            .then(() => this.$router.push({ name: "home" }));
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    ...mapState({
      //errors: state => state.auth.errors
    })
  }
};
</script>
