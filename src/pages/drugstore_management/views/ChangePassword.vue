<template>
  <v-card class="security__container pb-4">
    <v-card-text>
      <v-card-title>{{ $t("changePassword") }}</v-card-title>
      <v-form
          v-model="valid"
          class="px-5"
          ref="form">
        <v-row>
          <v-col cols="12">
            <v-text-field
                v-model="password.oldPassword"
                :append-icon="showValue.oldPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showValue.oldPass ? 'text' : 'password'"
                counter
                required
                :label="this.$t('oldPassword')"
                @click:append="showValue.oldPass = !showValue.oldPass"
                :rules="rules.required"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
                v-model="password.newPassword"
                :append-icon="showValue.newPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showValue.newPass ? 'text' : 'password'"
                :hint="this.$t('required')"
                counter
                required
                :label="this.$t('newPassword')"
                @click:append="showValue.newPass = !showValue.newPass"
                :rules="rules.required"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
                v-model="password.confirmPassword"
                :append-icon="showValue.confirmPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showValue.confirmPass ? 'text' : 'password'"
                counter
                required
                :label="this.$t('confirmPW')"
                :rules="rules.confirmPassRule"
                @click:append="showValue.confirmPass = !showValue.confirmPass"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn
                @click="confirmPassword"
                class="ma-auto"
                :disabled="!valid"
                color="success"
                width="100%">
              {{ $t('confirm') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-alert
          v-show="alert"
          :type="alertType"
          dense
          text
          class="mt-5 mx-5"
      >
        {{ alertMessage }}
      </v-alert>
    </v-card-text>
    <my-snackbar :is-show.sync="showSnackbar" :text="snackBarText" :type="snackBarType"></my-snackbar>
  </v-card>
</template>

<script>

import {drugstoreService} from "@/pages/drugstore_management/services/drugstore.services";
import MySnackbar from "@/components/MySnackbar";

export default {
  name: "ChangePassword",
  components: {MySnackbar},
  computed: {
    isLoading: {
      get() {
        return this.$store.state.isLoading;
      },
      set(value) {
        this.$store.commit("SET_IS_LOADING", value);
      }
    },
  },
  mounted() {
    this.$refs.form.reset();
  },
  data() {
    return {
      valid: false,
      alert: false,
      alertType: 'error',
      alertMessage: '',
      showSnackbar: false,
      snackBarText: "",
      snackBarType: "success",
      rules: {
        required: [v => !!v || this.$t('thisFieldRequired')],
        confirmPassRule: [() => (this.password.newPassword === this.password.confirmPassword) || 'Password must match']
      },
      showValue: {
        oldPass: false,
        newPass: false,
        confirmPass: false,
      },
      password: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }
    }
  },
  methods: {
    showSnackbarFunc(message, type) {
      this.snackBarText = message;
      this.snackBarType = type;
      this.showSnackbar = true;
    },
    confirmPassword() {
      let {oldPassword, newPassword, confirmPassword} = this.password;
      if (!newPassword || !oldPassword || !confirmPassword) return;
      // if (newPassword.length < 8 || confirmPassword.length < 8) return;

      if (newPassword !== confirmPassword) {
        this.alert = true;
        this.alertType = 'error';
        this.alertMessage = this.$t('alertConfirmNotCorrect');
      } else {
        this.isLoading += 1;
        this.alert = false;
        let vm = this;
        drugstoreService.changePassword(oldPassword, newPassword)
            .then(response => {
              if (response.status === 200) {
                console.log(response)
                // vm.alert = true;
                // vm.alertType = 'success';
                // vm.alertMessage = vm.$t('changPassSuccess');
                vm.showSnackbarFunc(vm.$t('changPassSuccess'), 'success');
                this.$refs.form.reset();
              } else {
                // vm.alert = true;
                // vm.alertType = 'error';
                // vm.alertMessage = vm.$t('changPassFail');
                vm.showSnackbarFunc(vm.$t('changPassFail'), 'error');
              }
            })
            .catch(() => {
              // vm.alert = true;
              // vm.alertType = 'error';
              // vm.alertMessage = vm.$t('changPassFail');
              vm.showSnackbarFunc(vm.$t('changPassFail'), 'error');
            })
            .finally(() => {
              vm.isLoading -= 1;
            });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.security__container {
  max-width: 60%;
  margin: auto;
}

@media only screen and (max-width: 768px) {
  .security__container {
    max-width: 80%;
  }
}
</style>
