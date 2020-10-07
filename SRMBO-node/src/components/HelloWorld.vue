<template>
  <div class="hello">
    <div>
      <button
        type="primary"
        icon="fas fa-edit"
        @click="handleClickLogin"
        :disabled="!isInit"
      >get authCode</button>
      <button
        type="primary"
        icon="fas fa-edit"
        @click="handleClickSignIn"
        v-if="!isSignIn"
        :disabled="!isInit"
      >sign in</button>
      <button
        type="primary"
        icon="fas fa-edit"
        @click="handleClickSignOut"
        v-if="isSignIn"
        :disabled="!isInit"
      >sign out</button>
      <button
        type="primary"
        icon="fas fa-edit"
        @click="handleClickDisconnect"
        :disabled="!isInit"
      >disconnect</button>
      <i class="fas fa-edit"></i>
      <p>isInit: {{isInit}}</p>
      <p>isSignIn: {{isSignIn}}</p>

      <button
        type="primary"
        icon="fas fa-edit"
        @click="handleClickUpdateScope"
        :disabled="!isInit"
      >update scope</button>
      <button @click="getData">SignIn</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      isInit: false,
      isSignIn: false,
      authCode: '',
    };
  },
  methods: {
    async handleClickUpdateScope() {
      const option = new window.gapi.auth2.SigninOptionsBuilder();
      option.setScope("email https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/calendar");
      const googleUser = this.$gAuth.GoogleAuth.currentUser.get();
      try {
        await googleUser.grant(option);
        console.log("success");
      } catch (error) {
        console.error(error);
      }
    },

    async getAccount(code) {
      // the code you sent with the client
      const { tokens } = await oauth2Client.getToken(code)
      oauth2Client.setCredentials(tokens)
      const oauth2 = google.oauth2({ version: 'v2' })
      const { data: { id } } = await oauth2.userinfo.get()
      // there you have the id of the user to store it in the database
      // and send it back in a JWT
    },

    getData() {
      if (this.authCode) {
        const path = 'https://apps.dw.fti.ukdw.ac.id/srm'
        // const headers = {
        //   Accept: "application/json",
        //   'Content-Type': "application/json"
        // }
        let code = {
          serverAuthCode: this.authCode
        }
        this.$axios.post(path + '/auth/signin', code)
        .then((result) => {
          console.log(result)
        })
        .catch((err) => {
          console.log(err.response)
        })
      return 
      }
    },

    handleClickLogin() {
      this.$gAuth
        .getAuthCode()
        .then((res) => {
          //on success
          this.authCode = res
          console.log(this.authCode)
        })
        .catch((error) => {
          //on fail do something
        });
    },

    async handleClickSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        console.log("googleUser", googleUser);
        console.log("getId", googleUser.getId());
        console.log("getBasicProfile", googleUser.getBasicProfile());
        console.log("getAuthResponse", googleUser.getAuthResponse());
        console.log(
          "getAuthResponse",
          this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse()
        );
        this.isSignIn = this.$gAuth.isAuthorized;
      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },

    async handleClickSignOut() {
      try {
        await this.$gAuth.signOut();
        this.isSignIn = this.$gAuth.isAuthorized;
        console.log("isSignIn", this.$gAuth.isAuthorized);
      } catch (error) {
        console.error(error);
      }
    },

    handleClickDisconnect() {
      window.location.href = `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${window.location.href}`;
    },
  },

  created() {
    console.log('asd')
    let that = this;
    let checkGauthLoad = setInterval(function () {
      that.isInit = that.$gAuth.isInit;
      that.isSignIn = that.$gAuth.isAuthorized;
      if (that.isInit) clearInterval(checkGauthLoad);
    }, 1000);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
