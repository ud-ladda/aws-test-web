<template>
  <div class="content">
    <div class="container py-0 login-form">
      <v-form
        ref="loginForm"
        v-model="valid"
        onsubmit="return false;"
        @submit="signIn"
      >
        <v-row>
          <v-col class="panel"></v-col>
          <v-col>
            <div class="container">
              <v-row>
                <v-col class="text-center">
                  <h2>Risk Assessment System</h2>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center">
                  <v-btn
                    outlined
                    block
                    color="secondary"
                    style="text-transform: none"
                    >Sign in with SCG account</v-btn
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center py-0">OR</v-col>
              </v-row>
              <v-row>
                <v-col class="pb-0">Username</v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="username"
                    outlined
                    :rules="[
                      ...$rule.email(),
                      ...$rule.required('Please enter the email.'),
                    ]"
                    placeholder="username@domain.com"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pb-0">Password</v-col>
              </v-row>
              <v-row>
                <v-col class="pb-0">
                  <v-text-field
                    v-model="password"
                    outlined
                    :rules="$rule.required('Please enter the password.')"
                    :type="'password'"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-right pt-0" style="margin-top: -10px">
                  <a href="#">Forgot your password</a>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    style="text-transform: none"
                    color="secondary"
                    block
                    type="submit"
                    >Sign in</v-btn
                  >
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </div>
    <ErrorDialog
      :dialog="alert"
      :message="'Incorrect username or password'"
      :header="'Error'"
      @onClose="alert = false"
    />
  </div>
</template>

<script>
export default {
  middleware: 'guest',
  layout: 'login',
  data() {
    return {
      username: null,
      password: null,
      valid: false,
      alert: false,
    }
  },
  created() {},
  methods: {
    async signIn() {
      if (this.$refs.loginForm.validate()) {
        this.$store.dispatch('global/setLoader', true)
        try {
          const payload = {
            email: this.username,
            password: this.password,
          }
          await this.$store.dispatch('auth/login', payload)
          await this.$store.dispatch(
            'auth/getUserRole',
            this.$permission.getUserId()
          )
          if (localStorage.getItem('access_token')) {
            this.$router.push('/')
          }
        } catch (err) {
          this.alert = true
          console.log(err)
        } finally {
          this.$store.dispatch('global/setLoader', false)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.login-form {
  background-color: $white;
  width: 50%;
  border-radius: 30px;
  box-shadow: 0px 2px 5px 3px #b5b5b5;
  .panel {
    border-radius: 30px 0px 0px 30px;
    background-image: linear-gradient(
      to top right,
      $secondary,
      $secondary-varaint 40%
    );
  }
}
.content {
  padding-top: 10%;
}
</style>
