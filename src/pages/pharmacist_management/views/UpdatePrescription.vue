<template>
  <v-container class="create-prescription__container">
    <v-card class="mb-4">
      <v-card-text>
        <v-card-title>
          {{ $t("inputPrescriptionToken") }}
        </v-card-title>
        <div class="px-5">
          <v-row>
            <v-col cols="12" md="8" sm="12">
              <v-text-field :label="this.$t('prescriptionToken')" v-model="prescriptionToken"
                            :error-messages="errorMessagesPrescriptionToken"
                            @input="inputPhoneNumber"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2" sm="12">
              <v-btn
                  @click="checkPatientPhone()"
                  class="mt-5"
                  color="primary"
                  width="100%">
                {{ $t("check") }}
              </v-btn>
            </v-col>
            <v-col cols="12" md="2" sm="12">
              <v-btn
                  @click="qrDialog = true"
                  class="mt-5 white--text"
                  color="blue-grey"
                  width="100%">
                {{ $t("scanQrCode") }}
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>

    <!--    =============================================================================================================-->

    <v-fade-transition>
      <v-form
          ref="form"
          v-model="valid"
          v-if="!!patientInfo.user && !!patientInfo.user.phone_number && patientInfo.user.phone_number.length > 0"
      >
        <v-card class="mb-4">
          <v-card-text>
            <v-card-title>
              {{ $t("stepTwoCheckInfoAndInputPrescription") }}
            </v-card-title>
            <div class="px-5">
              <v-row>
                <v-col cols="12" md="6" sm="12" class="py-0">
                  <v-text-field :label="this.$t('patientName')" v-model="patientInfo.name"
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
                                disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="12" class="py-0">
                  <v-text-field :label="this.$t('weight')" v-model="patientInfo.medical_info.weight"
                                required :rules="rules.required" disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="12" class="py-0">
                  <v-text-field :label="this.$t('bodyTemperature')" v-model="patientInfo.medical_info.body_temperature"
                                required :rules="rules.required" disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="12" class="py-0">
                  <v-text-field :label="this.$t('bloodGroup')" v-model="patientInfo.medical_info.blood_group"
                                required :rules="rules.required" disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="12" class="py-0">
                  <v-text-field :label="this.$t('systolicBloodPressure')"
                                v-model="patientInfo.medical_info.systolic_blood_pressure"
                                required :rules="rules.required" disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="12" class="py-0">
                  <v-text-field :label="this.$t('diastolicBloodPressure')"
                                v-model="patientInfo.medical_info.diastolic_blood_pressure"
                                required :rules="rules.required" disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12" sm="12" class="py-0">
                  <v-textarea :label="this.$t('medicalHistory')"
                              v-model="patientInfo.medical_info.medical_history" disabled
                  ></v-textarea>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-text>
            <v-card-title>
                {{ this.$t('stepThreeAddMedicines') }}
            </v-card-title>
          </v-card-text>
          <v-data-table
              :headers="headersTable"
              :items="itemsTable"
              hide-default-footer
              class="px-5 my-data-table"
          >
            <template v-slot:top>
              <v-textarea class="mx-4" :label="$t('diagnostic')" v-model="prescriptionData.diagnostic"
                          :disabled="true"
                          auto-grow
                          rows="1"
              ></v-textarea>
            </template>
            <template v-slot:[`item.doctor_note`]="{ item }">
              <v-textarea v-model="item.doctor_note"
                          :disabled="true"
                          rows="1"
                          auto-grow>
              </v-textarea>
            </template>
            <template v-slot:[`item.pharmacist_note`]="{ item }">
              <v-textarea v-model="item.pharmacist_note"
                          :rules="rules.required"
                          auto-grow
                          rows="1">
              </v-textarea>
            </template>
            <template v-slot:no-data>
              <h3>{{ $t('noData') }}</h3>
            </template>
          </v-data-table>
        </v-card>
        <v-btn class="mt-4"
               color="success"
               width="100%"
               :disabled="!valid || !itemsTable.length"
               @click="onSubmitForm">
          {{ $t("finish") }}
        </v-btn>

        <ConfirmDialog :show-dialog="showConfirmDialog"
                       :text="$t('confirmCreatePrescriptionFor') + patientInfo.name + '?'"
                       @confirmedDialog="confirmedDialog"
                       @updateShowDialog="updateShowConfirmDialog"/>
      </v-form>

    </v-fade-transition>

    <v-dialog v-model="qrDialog" width="1000">
      <v-card>
        <v-card-title>
          {{ $t("scanQrCode") }}
        </v-card-title>
        <my-qr-code-reader v-if="qrDialog" @emitResult="emitedQrResult"/>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showDetail">
      <prescription-info :prescription-data="selectedPrescription"/>
    </v-dialog>

    <my-snackbar :is-show.sync="showSnackbar" :text="snackBarText" :type="snackBarType"></my-snackbar>
  </v-container>
</template>

<script>
import constants from "@/utils/constants";
import {pharmacistService} from "@/pages/pharmacist_management/services/pharmacist.services";
import ConfirmDialog from "@/components/ConfirmDialog";
import MySnackbar from "@/components/MySnackbar";
import PrescriptionInfo from "@/components/PrescriptionInfo";
import MyQrCodeReader from "@/components/MyQrCodeReader";
import jwt_decode from "jwt-decode";

export default {
  name: 'UpdatePrescription',
  components: {MyQrCodeReader, PrescriptionInfo, MySnackbar, ConfirmDialog},
  data() {
    return {
      prescriptionId: 0,
      qrDialog: false,
      showDetail: false,
      selectedPrescription: {},
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
        {text: this.$t('id'), value: 'medicine.id'},
        {text: this.$t('medicineName'), value: 'medicine.name'},
        {text: this.$t('medicineTradeName'), value: 'medicine.trade_name'},
        {text: this.$t('concentration'), value: 'medicine.concentration'},
        {text: this.$t('usage'), value: 'medicine.usage'},
        {text: this.$t('amount'), value: 'amount', width: '10%', align: 'center'},
        {text: this.$t('doctorNote'), value: 'doctor_note', width: '40%'},
        {text: this.$t('pharmacistNote'), value: 'pharmacist_note', width: '40%'},
      ],
      itemsTable: [],
      searchMedicine: "",
      searchResultMedicine: [],
      options: {},
      totalMedicines: 0,
      isLoadingMedicines: false,
      prescriptionToken: "",
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
          "weight": 0,
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
      errorMessagesPrescriptionToken: ""
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
    emitedQrResult(value) {
      this.qrDialog = false;
      this.prescriptionToken = value;
      this.checkPatientPhone();
    },
    showSnackbarFunc(message, type) {
      this.snackBarText = message;
      this.snackBarType = type;
      this.showSnackbar = true;
    },
    getDataFromApi() {
      this.isLoadingMedicines = true;
      const {page, itemsPerPage} = this.options;
      pharmacistService.getMedicineList(page, itemsPerPage, this.searchMedicine)
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
    checkValidToken() {
      try {
        const data = jwt_decode(this.prescriptionToken);
        console.log(data);
        const exp = new Date(data.exp * 1000 - 5000); // JS deals with dates in milliseconds since epoch
        const now = new Date();
        if (now <= exp) {
          this.prescriptionId = data.prescription_id;
          return true;
        } else {
          this.errorMessagesPrescriptionToken = this.$t('tokenExpired');
          return false;
        }
      } catch (err) {
        console.log(err);
        this.errorMessagesPrescriptionToken = err;
        return false;
      }
    },
    checkPatientPhone() {
      if (this.prescriptionToken.length > 0 && this.checkValidToken()) {
        this.isLoading += 1;
        let vm = this;
        console.log(this.prescriptionToken);
        let data = {
          'prescription_token': this.prescriptionToken,
        }
        pharmacistService.getPrescriptionByToken(vm.prescriptionId, vm.prescriptionToken, data)
            .then(response => {
              if (response.status === 200) {
                vm.prescriptionData = response.data;
                vm.patientInfo = response.data.patient;
                vm.itemsTable = response.data.medicine_items;
              } else {
                vm.errorMessagesPrescriptionToken = vm.$t('tokenExpired');
              }
            })
            .catch(error => {
              console.log(error);
              vm.errorMessagesPrescriptionToken = vm.$t('tokenExpired');
            })
            .finally(() => {
              vm.isLoading -= 1;
            });
      } else {
        this.errorMessagesPrescriptionToken = "invalid";
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
      this.errorMessagesPrescriptionToken = '';
      if (this.$refs.form) this.$refs.form.reset();
    },
    confirmedDialog(value) {
      if (!this.checkValidToken()) {
        this.errorMessagesPrescriptionToken = this.$t('tokenExpired');
        return;
      }
      const medicine_items = this.itemsTable.map(item => {
        const container = {
          'id': item.id,
          'pharmacist_note': item.pharmacist_note,
        };
        return container;
      });
      let data = {
        'prescription_token': this.prescriptionToken,
        'medicine_items': medicine_items,
      }
      console.log("pharamcist update prescription: ", data);
      let vm = this;
      this.isLoading += 1;
      if (value === true) {
        pharmacistService.updatePrescription(this.prescriptionId, this.prescriptionToken, data)
            .then(response => {
              if (response.status === 200) {
                console.log(response);
                vm.$refs.form.reset();
                vm.itemsTable = [];
                vm.prescriptionToken = "";
                vm.showSnackbarFunc(this.$t('success'), 'success');
                vm.showDetail = true;
                vm.selectedPrescription = response.data;
              } else {
                vm.showSnackbarFunc(this.$t('didError'), 'error');
              }
            })
            .catch(error => {
              console.log(error);
              vm.showSnackbarFunc(this.$t('didError'), 'error');
            })
            .finally(() => {
              vm.isLoading -= 1;
            })
      }
    }
  },
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
.my-data-table {
  display: flex;
  flex-direction: column;
}

.my-data-table .v-datatable.v-table {
  order: -1;
}
</style>
