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
                <v-text-field :label="this.$t('pharmacist')" v-model="pharmacist.name"
                              :rules="rules.required"
                              name="name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2" sm="12" class="py-0">
                <!--                <v-text-field :label="this.$t('gender')" :value="$store.state.pharmacist.name?$t('male'):$t('female')"-->
                <!--                ></v-text-field>-->
                <v-select
                    :items="[{'value':false, text:$t('male')}, {'value':true, text:$t('female')}]"
                    :label="this.$t('gender')"
                    v-model="pharmacist.gender"
                    name="gender"
                ></v-select>
              </v-col>
              <v-col cols="12" md="4" sm="12" class="py-0">
                <v-text-field :label="this.$t('phoneNumber')" v-model="pharmacist.user.phone_number" disabled
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
import {pharmacistService} from "@/pages/pharmacist_management/services/pharmacist.services";
import MySnackbar from "@/components/MySnackbar";
// import {pharmacistService} from "@/pages/pharmacist_management/services/pharmacist.services";

export default {
  name: 'PharmacistInfo',
  data() {
    return {
      valid: false,
      alert: false,
      alertType: "error",
      alertMessage: "",
      showSnackbar: false,
      snackBarText: "",
      snackBarType: "success",
      pharmacist: {
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
    this.pharmacist = Object.assign({}, this.$store.state.pharmacist);
  },
  watch: {
    '$store.state.pharmacist': function() {
      this.pharmacist = Object.assign({}, this.$store.state.pharmacist);
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
        console.log(this.pharmacist);
        let data = {
          'name': this.pharmacist.name,
          'gender': this.pharmacist.gender,
        };
        this.isLoading += 1;
        let vm = this;
        pharmacistService.updatePharmacistInfo(data)
            .then(response => {
              if (response.status === 200) {
                console.log(response);
                this.$store.commit('SET_PHARMACIST', response.data);
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
