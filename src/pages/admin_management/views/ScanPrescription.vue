<template>
  <v-card class="social-network__container">
    <v-progress-linear absolute
                       top
                       :indeterminate="isLoading"
                       :active="isLoading"
    ></v-progress-linear>
    <v-card-text>
      <v-card-title>
        {{$t("socialNetwork")}}
      </v-card-title>
      <div class="px-5">
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <v-text-field :label="this.$t('prescriptionToken')"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-btn :disabled="isDisabledCheck || disabledInput"
                   class="mt-5"
                   color="success"
                   @click="checkUserTwitter"
                   width="100%">
              {{$t("check")}}
            </v-btn>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-btn color="primary"
                   :disabled="!isChecked || isHaveData"
                   @click="updateInfoTwitter"
                   width="100%">
              {{$t("scanQrCode")}}
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>

import {userService} from "@/pages/auth/services/user.services";
import constants from "@/utils/constants";

export default {
  name: 'LoginView',
  data() {
    return {
      isLoading: false,
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
