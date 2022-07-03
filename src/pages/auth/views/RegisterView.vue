<template>
  <v-container>
    <v-card class="pb-4">
      <v-card-text>
        <v-card-title>{{ $t("createAccount") }}</v-card-title>
        <v-form
            v-model="valid"
            class="px-5"
            ref="form">
          <v-row>
            <v-col cols="12">
              <v-select
                  v-model="role"
                  :items="roles"
                  filled
                  :label="$t('roleSelect')"
                  required
                  hide-details
                  :rules="rules.required"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  v-model="phone_number"
                  counter
                  required
                  :label="$t('phoneNumber')"
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
            <v-col cols="12">
              <v-text-field
                  v-model="email"
                  type="email"
                  counter
                  required
                  :label="this.$t('email')"
                  :rules="rules.email"
              >
              </v-text-field>
            </v-col>
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
    </v-card>
    <my-snackbar :is-show.sync="showSnackbar" :text="snackBarText" :type="snackBarType"></my-snackbar>
  </v-container>
</template>

<script>

import {userService} from "@/pages/auth/services/user.services";
import MySnackbar from "@/components/MySnackbar";

export default {
  name: "RegisterView",
  components: {MySnackbar},
  computed: {},
  mounted() {
    this.$refs.form.reset();
  },
  data() {
    return {
      email: '',
      role: '',
      roles: [
        {
          'text': this.$t('hospital'),
          'value': 'hospital',
        },
        {
          'text': this.$t('drugstore'),
          'value': 'drugstore',
        }
      ],
      fullName: "",
      valid: false,
      alert: false,
      alertType: 'error',
      alertMessage: '',
      showSnackbar: false,
      snackBarText: "",
      snackBarType: "success",
      rules: {
        required: [v => !!v || this.$t('thisFieldRequired')],
        confirmPassRule: [() => (this.password.newPassword === this.password.confirmPassword) || 'Password must match'],
        email: [v => /.+@.+\..+/.test(v) || this.$t("emailMustValid")],
      },
      showValue: {
        oldPass: false,
        newPass: false,
        confirmPass: false,
      },
      phone_number: "",
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
      let {newPassword, confirmPassword} = this.password;
      if (!newPassword || !confirmPassword) return;
      // if (newPassword.length < 8 || confirmPassword.length < 8) return;

      if (newPassword !== confirmPassword) {
        this.alert = true;
        this.alertType = 'error';
        this.alertMessage = this.$t('alertConfirmNotCorrect');
      } else {
        // this.isLoading += 1;
        this.alert = false;
        let data = {
          'phone_number': this.phone_number,
          'password': newPassword,
          'email': this.email,
          // 'name': this.fullName,
        }
        let vm = this;
        console.log(this.role);
        if (this.role === 'hospital') {
          userService.registerHospital(data)
              .then(response => {
                if (response.status === 200) {
                  vm.showSnackbarFunc(this.$t('success'), 'success');
                  document.location.href = '/auth/about'
                } else {
                  vm.showSnackbarFunc(vm.$t(response.data.detail), 'error');
                }
              })
              .catch(error => {
                if (error.response.data.detail) {
                  vm.showSnackbarFunc(vm.$t(error.response.data.detail), 'error');
                } else {
                  vm.showSnackbarFunc(this.$t('didError'), 'error');
                }
              })
              .finally(() => {
                // vm.isLoading = false;
              });
        }
        else if (this.role === 'drugstore') {
          userService.registerDrugstore(data)
              .then(response => {
                if (response.status === 200) {
                  vm.showSnackbarFunc(this.$t('success'), 'success');
                  document.location.href = '/auth/about'
                } else {
                  vm.showSnackbarFunc(vm.$t(response.data.detail), 'error');
                }
              })
              .catch(error => {
                if (error.response.data.detail) {
                  vm.showSnackbarFunc(vm.$t(error.response.data.detail), 'error');
                } else {
                  vm.showSnackbarFunc(this.$t('didError'), 'error');
                }
              })
              .finally(() => {
                // vm.isLoading = false;
              });
        }
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
