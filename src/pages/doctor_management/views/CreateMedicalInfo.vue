<template>
  <v-container class="create-prescription__container">
    <v-card class="mb-4">
      <v-card-text>
        <v-card-title>
          {{ $t("stepOneInputPatientPhoneNumber") }}
        </v-card-title>
        <div class="px-5">
          <v-row>
            <v-col cols="12" md="9" sm="12">
              <v-text-field :label="this.$t('patientPhoneNumber')" v-model="patientPhoneNumber"
                            :error-messages="errorMessagesPhoneNumber"
                            @input="inputPhoneNumber"
                            :rules="rules.required"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <v-btn
                  @click="checkPatientPhone()"
                  class="mt-5"
                  color="primary"
                  width="100%">
                {{ $t("check") }}
              </v-btn>
            </v-col>
            <!--            <v-col cols="12" md="3" sm="12">-->
            <!--              <v-btn class="mt-5"-->
            <!--                     color="primary"-->
            <!--                     width="100%">-->
            <!--                {{ $t("scanQrCode") }}-->
            <!--              </v-btn>-->
            <!--            </v-col>-->
          </v-row>
        </div>
      </v-card-text>
    </v-card>

    <!--    =============================================================================================================-->
    <v-fade-transition>
      <v-form
          ref="form"
          v-model="valid"
          v-if="!!patientInfo.user.phone_number && patientInfo.user && patientInfo.user.phone_number.length > 0"
      >

        <v-card>
          <v-card-text>
            <v-card-title>
              {{ $t("stepTwoCheckInfoAndInputPrescription") }}
            </v-card-title>
            <div class="px-5">
              <v-row>
                <v-col cols="12" md="6" sm="12" class="py-0">
                  <v-text-field :label="this.$t('patientName')" :value="patientInfo.name"
                                disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="12" class="py-0">
                  <v-text-field :label="this.$t('dob')" :value="patientInfo.dob" disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="12" class="py-0">
                  <v-text-field :label="this.$t('gender')" :value="patientInfo.gender?$t('male'):$t('female')" disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="12" class="py-0">
                  <v-text-field :label="this.$t('phoneNumber')" v-model="patientInfo.user.phone_number" disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="12" class="py-0">
                  <v-text-field :label="this.$t('insuranceNumber')" :value="patientInfo.social_insurance" disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12" sm="12" class="py-0">
                  <v-text-field :label="this.$t('address')" :value="patientInfo.address" disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="12" class="py-0">
                  <v-text-field :label="this.$t('height')" v-model="patientInfo.medical_info.height"
                                required :rules="rules.required"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="12" class="py-0">
                  <v-text-field :label="this.$t('weight')" v-model="patientInfo.medical_info.weight"
                                required :rules="rules.required"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="12" class="py-0">
                  <v-text-field :label="this.$t('bodyTemperature')" v-model="patientInfo.medical_info.body_temperature"
                                required :rules="rules.required"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="12" class="py-0">
                  <v-text-field :label="this.$t('bloodGroup')" v-model="patientInfo.medical_info.blood_group"
                                required :rules="rules.required"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="12" class="py-0">
                  <v-text-field :label="this.$t('systolicBloodPressure')"
                                v-model="patientInfo.medical_info.systolic_blood_pressure"
                                required :rules="rules.required"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="12" class="py-0">
                  <v-text-field :label="this.$t('diastolicBloodPressure')"
                                v-model="patientInfo.medical_info.diastolic_blood_pressure"
                                required :rules="rules.required"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12" sm="12" class="py-0">
                  <v-textarea :label="this.$t('medicalHistory')"
                              v-model="patientInfo.medical_info.medical_history"
                  ></v-textarea>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>

        <v-btn class="mt-4"
               color="success"
               width="100%"
               :disabled="!valid"
               @click="onSubmitForm">
          {{ $t("finish") }}
        </v-btn>

        <ConfirmDialog :show-dialog="showConfirmDialog"
                       :text="$t('confirmCreatePrescriptionFor') + patientInfo.name + '?'"
                       @confirmedDialog="confirmedDialog"
                       @updateShowDialog="updateShowConfirmDialog"/>
      </v-form>
    </v-fade-transition>

    <my-snackbar :is-show.sync="showSnackbar" :text="snackBarText" :type="snackBarType"></my-snackbar>
  </v-container>
</template>

<script>
import constants from "@/utils/constants";
import {doctorService} from "@/pages/doctor_management/services/doctor.services";
import ConfirmDialog from "@/components/ConfirmDialog";
import MySnackbar from "@/components/MySnackbar";

export default {
  name: 'CreateMedicalInfo',
  data() {
    return {
      showSnackbar: false,
      snackBarText: "",
      snackBarType: "success",
      rules: {
        required: [v => !!v || this.$t('thisFieldRequired')],
        notZero: [v => v > 0 || this.$t('thisFieldRequired')],
      },
      diagnostic: "",
      isDialog: false,
      valid: false,
      headersTable: [
        {text: this.$t('id'), value: 'id'},
        {text: this.$t('medicineName'), value: 'name'},
        {text: this.$t('medicineTradeName'), value: 'trade_name'},
        {text: this.$t('concentration'), value: 'concentration'},
        {text: this.$t('usage'), value: 'usage'},
        {text: this.$t('amount'), value: 'amount', width: '10%'},
        {text: this.$t('delete'), value: 'delete'},
      ],
      itemsTable: [],
      searchMedicine: "",
      headersTableMedicine: [
        {text: this.$t('id'), value: 'id'},
        {text: this.$t('medicineName'), value: 'name'},
        {text: this.$t('medicineTradeName'), value: 'trade_name'},
        {text: this.$t('concentration'), value: 'concentration'},
        {text: this.$t('usage'), value: 'usage'},
        {text: this.$t('facility'), value: 'facility'},
        {text: this.$t('country'), value: 'country'},
        {text: this.$t('add'), value: 'add'},
      ],
      searchResultMedicine: [],
      options: {},
      totalMedicines: 0,
      isLoadingMedicines: false,
      patientPhoneNumber: "",
      patientInfo: {
        "id": 0,
        "user": {
          "id": 0,
          "phone_number": "",
          "email": "",
          "role": "",
          "created_at": "",
          "updated_at": "",
          "is_active": false
        },
        "dob": "",
        "medical_info": {
          "height": 0,
          "wieght": 0,
          "body_temperature": 0,
          "blood_pressure": 0,
          "blood_group": "",
          "medical_history": ""
        },
        "name": "",
        "gender": false,
        "identify_number": "",
        "social_insurance": "",
        "created_at": "",
        "updated_at": ""
      },
      showConfirmDialog: false,
      errorMessagesPhoneNumber: ""
    }
  },
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
    searchMedicine() {
      this.options.page = 1;
      this.getDataFromApi();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // this.$refs.form.reset();
    },
    showSnackbarFunc(message, type) {
      this.snackBarText = message;
      this.snackBarType = type;
      this.showSnackbar = true;
    },
    getDataFromApi() {
      this.isLoadingMedicines = true;
      const {page, itemsPerPage} = this.options;
      doctorService.getMedicineList(page, itemsPerPage, this.searchMedicine)
          .then(response => {
            this.searchResultMedicine = response.data.results;
            this.totalMedicines = response.data.total;
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
                this.isLoadingMedicines = false;
              }
          );
    },
    deleteRow(item) {
      const index = this.itemsTable.indexOf(item);
      this.itemsTable.splice(index, 1);
    },
    addRow(item) {
      this.itemsTable.push({
        'id': item.id,
        'name': item.name,
        'trade_name': item.trade_name,
        'concentration': item.concentration,
        'usage': item.usage,
        'amount': 0,
      });
    },
    checkAddDisabled(inpItem) {
      for (let i = 0; i < this.itemsTable.length; i++) {
        if (this.itemsTable[i].id === inpItem.id) return true;
      }
      return false;
    },
    checkPatientPhone() {
      if (this.patientPhoneNumber.length > 0) {
        this.isLoading += 1;
        doctorService.getPatientInfo(this.patientPhoneNumber)
            .then(response => {
              if (response.status === 200) {
                console.log("OKKK", response);
                this.patientInfo = response.data;
                // this.showSnackbarFunc(this.$t('success'), 'success');
              } else {
                // this.showSnackbarFunc(this.$t('didError'), 'error');
                this.errorMessagesPhoneNumber = this.$t("phoneNumberNotFound");
              }
            })
            .catch(error => {
              console.log(error);
              this.errorMessagesPhoneNumber = this.$t("phoneNumberNotFound");
              // this.showSnackbarFunc(this.$t('didError'), 'error');
            })
            .finally(() => {
              this.isLoading -= 1;
            });
      }
    },
    updateShowConfirmDialog(value) {
      this.showConfirmDialog = value;
    },
    async onSubmitForm() {
      await this.$refs.form.validate();
      console.log(this.valid);
      if (this.valid) {
        this.showConfirmDialog = true;
      }
    },
    inputPhoneNumber() {
      this.errorMessagesPhoneNumber = '';
      if (this.$refs.form) this.$refs.form.reset();
    },
    confirmedDialog(value) {
      if (value !== true) return null;
      this.isLoading += 1;
      doctorService.createMedicalInfo(this.patientInfo.id, this.patientInfo.medical_info)
          .then(response => {
            if (response.status === 200) {
              console.log("success");
              this.showSnackbarFunc(this.$t('success'), 'success');
            } else {
              this.showSnackbarFunc(this.$t('didError'), 'error');
            }
          })
          .catch(error => {
            console.log(error);
            this.showSnackbarFunc(this.$t('didError'), 'error');
          })
          .finally(() => {
            this.isLoading -= 1;
          });
    }
  },
  components: {MySnackbar, ConfirmDialog},
  computed: {
    getRouterLinkForgotPassword: function () {
      return constants.ROUTER_FORGOT_PASSWORD;
    },
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
.login__container {
  height: 100%;
}

.disable-events {
  pointer-events: none
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .15s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
