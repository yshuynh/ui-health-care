<template>
  <v-container fluid fill-height class="login__container">
    <v-row justify="center">
      <v-col
          cols="12"
          xl="3"
          lg="4"
          md="6"
          sm="10"
      >
        <v-card>
          <v-progress-linear
              :active="isLoading"
              :indeterminate="isLoading"
              absolute
              top
              color="teal lighten-2"
          ></v-progress-linear>
          <v-card-title class="text-uppercase">Login</v-card-title>
          <v-card-text>
            <v-form :lazy-validation="lazy" ref="form" v-model="valid" @submit.prevent="login" id="checkLogin">
              <v-text-field
                  counter
                  :label="this.$t('phone_number')"
                  v-model="phone_number"
              ></v-text-field>

              <v-text-field
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                  counter
                  :label="this.$t('password')"
                  v-model="password"
              ></v-text-field>

              <router-link class="d-block grey--text my-5"
                           :to="getRouterLinkForgotPassword"
              >
                {{ this.$t('forgotPassword') }}
              </router-link>

              <v-alert
                  :value="isShowNotify"
                  outlined
                  text
                  transition="scale-transition"
                  type="error">
                {{ this.message }}
              </v-alert>
              <v-btn
                  :disabled="!valid"
                  type="submit"
                  form="checkLogin"
                  color="success"
                  width="100%"
                  :loading="isLoading"
              >
                {{ $t('signIn') }}
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import {userService} from "@/pages/auth/services/user.services";
import constants from "@/utils/constants";

export default {
  name: 'LoginView',
  data() {
    return {
      isLoading: false,
      valid: true,
      lazy: false,
      phone_number: "",
      password: "",
      show: false,
      isShowNotify: false,
      message: "",
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      userService.getPatientInfo()
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
          .finally()
    },
    login: async function () {
      this.isLoading = true;
      this.isShowNotify = false;
      let vm = this;
      // if (!phone_number || !password){
      //   if (!phone_number)  this.message = this.$error('1000');
      //   else this.message =  this.$error('1001');
      //   this.isShowNotify = true;
      //   this.isLoading = false;
      // }
      // else{
      userService.login(vm.phone_number, vm.password)
          .then(response => {
            let data = response.data;
            vm.$cookie.set(constants.ACCESS_TOKEN, response.data[constants.ACCESS_TOKEN]);
            vm.$cookie.set(constants.REFRESH_TOKEN, response.data[constants.REFRESH_TOKEN]);
            let redirect = data.redirect;
            if (constants.IS_DEV_MODE) {
              //temporary
              this.$nextTick(() => {
                window.location.href = redirect
              });
            } else {
              this.$nextTick(() => {
                window.location.href = redirect
              });
            }
          })
          .catch(error => {
            console.log(error)
            vm.message = error.response.data;
            vm.isShowNotify = true;
          })
          .finally(() => {
            vm.isLoading = false;
          });
    }
  },
  components: {},
  computed: {
    getRouterLinkForgotPassword: function () {
      return constants.ROUTER_FORGOT_PASSWORD;
    }
  },
}
</script>

<style lang="scss" scoped>
.login__container {
  height: 100%;
}
</style>
