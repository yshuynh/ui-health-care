<template>
  <v-container>
    <v-form
        ref="form"
        v-model="valid"
    >
      <v-card class="mb-4">
        <v-card-text>
          <v-card-title class="mb-2">
            <v-row>
              <v-col cols="12" md="9" sm="12" class="py-0">
                {{ this.$t('personalInfo') }}
              </v-col>
              <v-col cols="12" md="3" sm="12" class="py-0">
                <v-btn
                    color="success"
                    width="100%"
                    @click="checkSubmit">
                  {{ $t("save") }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <div class="px-5">
            <v-row>
              <v-col cols="12" md="6" sm="12" class="py-0">
                <v-text-field :label="this.$t('doctor')" v-model="doctor.name"
                              :rules="rules.required"
                              name="name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2" sm="12" class="py-0">
                <!--                <v-text-field :label="this.$t('gender')" :value="$store.state.doctor.name?$t('male'):$t('female')"-->
                <!--                ></v-text-field>-->
                <v-select
                    :items="[{'value':false, text:$t('male')}, {'value':true, text:$t('female')}]"
                    :label="this.$t('gender')"
                    v-model="doctor.gender"
                    name="gender"
                ></v-select>
              </v-col>
              <v-col cols="12" md="4" sm="12" class="py-0">
                <v-text-field :label="this.$t('phoneNumber')" v-model="doctor.user.phone_number" disabled
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
<!--          <v-alert-->
<!--              v-show="alert"-->
<!--              :type="alertType"-->
<!--              dense-->
<!--              text-->
<!--              class="mt-5 mx-5"-->
<!--          >-->
<!--            {{ alertMessage }}-->
<!--          </v-alert>-->
        </v-card-text>
      </v-card>
    </v-form>
    <ConfirmDialog :show-dialog="showConfirmDialog"
                   @updateShowDialog="updateShowConfirmDialog"
                   @confirmedDialog="confirmedDialog"
                   :text="this.$t('confirmSaveInfo') + '?'"/>
    <my-snackbar :is-show.sync="showSnackbar" :text="snackBarText" :type="snackBarType"></my-snackbar>
  </v-container>
</template>

<script>

import ConfirmDialog from "@/components/ConfirmDialog";
// import constants from "@/utils/constants";
import {doctorService} from "@/pages/doctor_management/services/doctor.services";
import MySnackbar from "@/components/MySnackbar";
// import {doctorService} from "@/pages/doctor_management/services/doctor.services";

export default {
  name: 'DoctorInfo',
  data() {
    return {
      valid: false,
      alert: false,
      alertType: "error",
      alertMessage: "",
      showSnackbar: false,
      snackBarText: "",
      snackBarType: "success",
      doctor: {
        'user': {
          'phone_number': "",
        },
        'name': "",
        'gender': false,
      },
      rules: {
        required: [v => !!v || this.$t('thisFieldRequired')],
        notZero: [v => v > 0 || this.$t('thisFieldRequired')],
      },
      showConfirmDialog: false,
    }
  },
  mounted() {
    this.doctor = Object.assign({}, this.$store.state.doctor);
  },
  watch: {
    '$store.state.doctor': function() {
      this.doctor = Object.assign({}, this.$store.state.doctor);
    }
  },
  methods: {
    async checkSubmit() {
      await this.$refs.form.validate();
      if (this.valid) {
        this.showConfirmDialog = true;
      }
    },
    showAlert(type, message) {
      this.alert = true;
      this.alertType = type;
      this.alertMessage = message;
    },
    showSnackbarFunc(message, type) {
      this.snackBarText = message;
      this.snackBarType = type;
      this.showSnackbar = true;
    },
    updateShowConfirmDialog(value) {
      this.showConfirmDialog = value;
    },
    confirmedDialog(value) {
      if (value === true) {
        console.log(this.doctor);
        let data = {
          'name': this.doctor.name,
          'gender': this.doctor.gender,
        };
        this.isLoading += 1;
        let vm = this;
        doctorService.updateDoctorInfo(data)
            .then(response => {
              if (response.status === 200) {
                console.log(response);
                this.$store.commit('SET_DOCTOR', response.data);
                this.showAlert('success', vm.$t('saveSuccess'));
                vm.showSnackbarFunc(vm.$t('saveSuccess'), "success");
              } else {
                this.showAlert('error', vm.$t('didError'));
              }
            })
            .catch(error => {
              console.log(error);
              this.showAlert('error', vm.$t('didError'));
            })
            .finally(() => {
              this.isLoading -= 1;
            });
      }
    }
  },

  components: {MySnackbar, ConfirmDialog},

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
}
</script>


<style lang="scss" scoped>
</style>
