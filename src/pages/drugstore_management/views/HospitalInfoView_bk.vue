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
              <v-col cols="12" md="8" sm="12" class="py-0">
                <v-text-field :label="this.$t('drugstore')" v-model="drugstore.name"
                              :rules="rules.required"
                              name="name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="12" class="py-0">
                <v-text-field :label="this.$t('phoneNumber')" v-model="drugstore.user.phone_number" disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12" sm="12" class="py-0">
                <v-textarea :label="this.$t('address')" v-model="drugstore.address"
                            :rules="rules.required"
                            name="name"
                            auto-grow
                            rows="1"
                ></v-textarea>
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

    <v-card v-html="getGgMapIframe(drugstore.address)">
    </v-card>
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
import {drugstoreService} from "@/pages/drugstore_management/services/drugstore.services";
import MySnackbar from "@/components/MySnackbar";
// import {drugstoreService} from "@/pages/drugstore_management/services/drugstore.services";

export default {
  name: 'DrugstoreInfo',
  data() {
    return {
      valid: false,
      alert: false,
      alertType: "error",
      alertMessage: "",
      showSnackbar: false,
      snackBarText: "",
      snackBarType: "success",
      drugstore: {
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
    this.drugstore = Object.assign({}, this.$store.state.drugstore);
  },
  watch: {
    '$store.state.drugstore': function() {
      this.drugstore = Object.assign({}, this.$store.state.drugstore);
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
        console.log(this.drugstore);
        let data = {
          'name': this.drugstore.name,
          'gender': this.drugstore.gender,
        };
        this.isLoading += 1;
        let vm = this;
        drugstoreService.updateDrugstoreInfo(data)
            .then(response => {
              if (response.status === 200) {
                console.log(response);
                this.$store.commit('SET_DRUGSTORE', response.data);
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
    },
    getGgMapIframe(address) {
      return `<iframe src="https://maps.google.com/maps?q=${address}&output=embed" width="100%" height="600" style="display:block; border: 0;"></iframe>`
    },
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
