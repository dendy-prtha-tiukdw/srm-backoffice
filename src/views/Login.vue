<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row" style="margin-top: 200px">
        <div class="col-md-6" style="margin-left: 37%">
          <h1>SRM BackOffice</h1>
        </div>
        <div class="col-md-6 offset-md-3 col-xs-12">
          <button
            class="btn btn-block btn-lg btn-primary pull-xs-center"
            @click="handleClickLogin"
            :disabled="!gAuthReady"
          >
            Sign in Using Google
          </button>
        </div>
        <div class="col-md-6 offset-md-3 col-xs-12">
          <button
            class="btn btn-block btn-lg btn-primary pull-xs-center"
            @click="handleSignup"
          >
            Sign Up
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
    },
    handleSignup() {
      this.$router.push({
        name: "signup"
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
