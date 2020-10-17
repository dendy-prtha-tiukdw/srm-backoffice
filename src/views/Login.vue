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
import JwtService from "@/common/jwt.service";
/* eslint-disable no-console */
export default {
  name: "Login",
  data() {
    return {
      gAuthReady: false,
      email: null,
      password: null
    };
  },
  beforeCreate() {
    if (JwtService.getRefreshToken()) {
      this.$router.push({ name: "home" });
    }
  },
  created() {
    let that = this;
    let checkGauthLoad = setInterval(function() {
      that.gAuthReady = that.$gAuth.isInit;
      if (that.isInit) clearInterval(checkGauthLoad);
    }, 1000);
  },
  methods: {
    handleClickLogin() {
      this.$gAuth
        .getAuthCode()
        .then(authCode => {
          this.$store.dispatch(LOGIN, authCode);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  }
};
</script>
