<template>
  <v-container fluid class="create-prescription__container">
    <v-card class="mb-4">
      <v-card-text>
        <v-card-title>
          {{ $t("stepOneInputPatientInfoToken") }}
        </v-card-title>
        <div class="px-5">
          <v-row>
            <v-col cols="12" md="8" sm="12">
              <v-text-field :label="this.$t('patientInfoToken')" v-model="patientInfoToken"
                            :error-messages="errorMessagesPatientInfoToken"
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

                                disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="12" class="py-0">
                  <v-text-field :label="this.$t('weight')" v-model="patientInfo.medical_info.weight"
                                disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="12" class="py-0">
                  <v-text-field :label="this.$t('bodyTemperature')" v-model="patientInfo.medical_info.body_temperature"
                                disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="12" class="py-0">
                  <v-text-field :label="this.$t('bloodGroup')" v-model="patientInfo.medical_info.blood_group"
                                disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="12" class="py-0">
                  <v-text-field :label="this.$t('systolicBloodPressure')"
                                v-model="patientInfo.medical_info.systolic_blood_pressure"
                                disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="12" class="py-0">
                  <v-text-field :label="this.$t('diastolicBloodPressure')"
                                v-model="patientInfo.medical_info.diastolic_blood_pressure"
                                disabled
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

        <prescription-table
            :search-result-prescription="patientPrescriptionList"
            :total-prescription="totalPatientPrescription"
            @fetchData="fetchPatientPrescriptionList"
            class="mb-4"
        />

        <medical-info-selector
            :medical-info-list="medicalInfoList"
            :selected-medical-info.sync="selectedMedicalInfo"
            class="mb-4"/>

        <v-card>
          <v-card-text>
            <v-card-title>
              <v-row>
                <v-col cols="12" md="9" sm="12" class="py-0">
                  {{ this.$t('stepThreeAddMedicines') }}
                </v-col>
                <v-col cols="12" md="3" sm="12" class="py-0">
                  <v-btn
                      color="primary"
                      width="100%"
                      @click="isDialog=true">
                    {{ $t("add") }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-title>
          </v-card-text>
          <v-data-table
              :headers="headersTable"
              :items="itemsTable"
              hide-default-footer
              class="px-8"
          >
            <template v-slot:top>
              <v-textarea :label="$t('diagnostic')" v-model="diagnostic" required :rules="rules.required"
                          auto-grow
                          rows="1"
              ></v-textarea>

              <v-textarea :label="$t('prescriptionNote')" v-model="prescriptionNote" required :rules="rules.required"
                          auto-grow
                          rows="1"
              ></v-textarea>
            </template>
            <template v-slot:[`item.amount`]="{ item }">
              <v-text-field v-model="item.amount"
                            single-line
                            :rules="rules.notZero"
                            type="number">
              </v-text-field>
            </template>
            <template v-slot:[`item.delete`]="{ item }">
              <v-btn icon @click="deleteRow(item)">
                <v-icon :key="item.delete">mdi-delete</v-icon>
              </v-btn>
            </template>
            <template v-slot:[`item.doctor_note`]="{ item }">
              <v-row class="my-2" :key="item.id">
                <v-col cols="12" md="6" sm="12" class="py-0">
                  <v-textarea v-model="item.doctorNote.morning"
                              auto-grow
                              label="Sáng"
                              rows="1">
                  </v-textarea>
                </v-col>
                <v-col cols="12" md="6" sm="12" class="py-0">
                  <v-textarea v-model="item.doctorNote.noon"
                              auto-grow
                              label="Trưa"
                              rows="1">
                  </v-textarea>
                </v-col>
                <v-col cols="12" md="6" sm="12" class="py-0">
                  <v-textarea v-model="item.doctorNote.afternoon"
                              auto-grow
                              label="Chiều"
                              rows="1">
                  </v-textarea>
                </v-col>
                <v-col cols="12" md="6" sm="12" class="py-0">
                  <v-textarea v-model="item.doctorNote.night"
                              auto-grow
                              label="Tối"
                              rows="1">
                  </v-textarea>
                </v-col>
              </v-row>
            </template>
            <template v-slot:[`item.pharmacist_note`]="{ item }">
              <v-textarea v-model="item.pharmacist_note"
                          :disabled="true"
                          rows="1"
                          auto-grow>
              </v-textarea>
            </template>
            <template v-slot:no-data>
              <h3>{{ $t('noData') }}</h3>
            </template>
          </v-data-table>
        </v-card>

        <v-dialog v-model="isDialog">
          <v-card>
            <!--        <v-progress-linear absolute-->
            <!--                           top-->
            <!--                           :indeterminate="isLoadingMedicines"-->
            <!--                           :active="isLoadingMedicines"-->
            <!--        ></v-progress-linear>-->
            <v-card-title>
              {{ this.$t('medicineList') }}
            </v-card-title>
            <v-data-table
                :headers="headersTableMedicine"
                :items="searchResultMedicine"
                class="px-8"
                :options.sync="options"
                :server-items-length="totalMedicines"
                :loading="isLoadingMedicines"
                :rules="rules.notEmpty"
            >
              <template v-slot:top>
                <v-text-field
                    v-model="searchMedicine"
                    :label="$t('searchMedicineName')"
                ></v-text-field>
              </template>
              <template v-slot:[`item.add`]="{ item }">
                <v-btn icon @click="addRow(item)" :disabled="checkAddDisabled(item)">
                  <v-icon :key="item.add">mdi-plus</v-icon>
                </v-btn>
              </template>
              <template v-slot:no-data>
                <h3>{{ $t('noData') }}</h3>
              </template>
            </v-data-table>
          </v-card>
        </v-dialog>
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

    <v-dialog v-model="showDetail" width="1200">
      <prescription-info :prescription-data="selectedPrescription"/>
    </v-dialog>

    <my-snackbar :is-show.sync="showSnackbar" :text="snackBarText" :type="snackBarType"></my-snackbar>
  </v-container>
</template>

<script>
import constants from "@/utils/constants";
import {doctorService} from "@/pages/doctor_management/services/doctor.services";
import ConfirmDialog from "@/components/ConfirmDialog";
import MySnackbar from "@/components/MySnackbar";
import PrescriptionInfo from "@/components/PrescriptionInfo";
import MyQrCodeReader from "@/components/MyQrCodeReader";
import jwt_decode from "jwt-decode";
import PrescriptionTable from "@/components/PrescriptionTable";
import MedicalInfoSelector from "@/components/MedicalInfoSelector";

export default {
  name: 'CreatePrescription',
  components: {MedicalInfoSelector, PrescriptionTable, MyQrCodeReader, PrescriptionInfo, MySnackbar, ConfirmDialog},
  data() {
    return {
      selectedMedicalInfo: null,
      medicalInfoList: [],
      prescriptionNote: "",
      patientPrescriptionList: [],
      totalPatientPrescription: 0,
      patientId: 0,
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
        {text: this.$t('id'), value: 'id'},
        {text: this.$t('medicineName'), value: 'name'},
        {text: this.$t('medicineTradeName'), value: 'trade_name'},
        {text: this.$t('concentration'), value: 'concentration'},
        {text: this.$t('usage'), value: 'usage'},
        {text: this.$t('amount'), value: 'amount', width: '10%'},
        {text: this.$t('doctorNote'), value: 'doctor_note', width: '40%'},
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
      patientInfoToken: "",
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
      errorMessagesPatientInfoToken: ""
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
    fetchPatientPrescriptionList(data) {
      let vm = this;
      this.isLoading += 1;
      doctorService.getPatientPrescriptionList(this.patientId, this.patientInfoToken, data.page, data.pageSize)
          .then(response => {
            if (response.status === 200) {
              vm.patientPrescriptionList = response.data.results;
              vm.totalPatientPrescription = response.data.total;
            } else {
              vm.errorMessagesPatientInfoToken = this.$t("error");
            }
          })
          .catch(error => {
            console.log(error);
            vm.errorMessagesPatientInfoToken = this.$t("error");
          })
          .finally(() => {
            vm.isLoading -= 1;
          });
    },
    emitedQrResult(value) {
      this.qrDialog = false;
      this.patientInfoToken = value;
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
        'doctorNote': {
          morning: '',
          noon: '',
          afternoon: '',
          night: ''
        }
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
        const data = jwt_decode(this.patientInfoToken);
        console.log(data);
        const exp = new Date(data.exp * 1000 - 5000); // JS deals with dates in milliseconds since epoch
        const now = new Date();
        if (now <= exp) {
          this.patientId = data.patient_id;
          return true;
        } else {
          this.errorMessagesPatientInfoToken = this.$t('tokenExpired');
          return false;
        }
      } catch (err) {
        console.log(err);
        this.errorMessagesPatientInfoToken = err;
        return false;
      }
    },
    checkPatientPhone() {
      if (this.patientInfoToken.length > 0 && this.checkValidToken()) {
        this.isLoading += 1;
        let vm = this;
        doctorService.getPatientInfoByToken(this.patientInfoToken, this.patientId)
            .then(response => {
              if (response.status === 200) {
                console.log("OKKK", response);
                vm.patientInfo = response.data;
                // vm.medicalInfoList = response.data.medical_infos;
                vm.medicalInfoList = response.data.medical_infos.map(item => {
                  let new_data = item;
                  let {date, time} = vm.getFormatedDate(item.created_at);
                  new_data['text'] = 'ID: ' + item.id + '\t/\tNgày tạo: ' + date + ' ' + time;
                  return new_data;
                });
                if (vm.medicalInfoList.length > 0) vm.selectedMedicalInfo = vm.medicalInfoList[0];
              } else {
                vm.errorMessagesPatientInfoToken = this.$t("phoneNumberNotFound");
              }
            })
            .catch(error => {
              console.log(error);
              vm.errorMessagesPatientInfoToken = this.$t("phoneNumberNotFound");
            })
            .finally(() => {
              vm.isLoading -= 1;
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
      this.errorMessagesPatientInfoToken = '';
      if (this.$refs.form) this.$refs.form.reset();
    },
    getFormatedDate(rawDate) {
      let datetime = new Date(rawDate);
      let date = datetime.toLocaleDateString()
      let time = datetime.toLocaleTimeString()
      return {date, time};
    },
    confirmedDialog(value) {
      if (!this.checkValidToken()) return;
      const medicine_items = this.itemsTable.map(item => {
        let doctorNote = "";
        if (item.doctorNote.morning.length > 0) doctorNote += `Sáng: ${item.doctorNote.morning}\n`;
        if (item.doctorNote.noon.length > 0) doctorNote += `Trưa: ${item.doctorNote.noon}\n`;
        if (item.doctorNote.afternoon.length > 0) doctorNote += `Chiều: ${item.doctorNote.afternoon}\n`;
        if (item.doctorNote.night.length > 0) doctorNote += `Tối: ${item.doctorNote.night}\n`;
        const container = {
          'medicine': item.id,
          'amount': item.amount,
          'doctor_note': doctorNote,
        };
        return container;
      })
      let data = {
        'patient_info_token': this.patientInfoToken,
        'diagnostic': this.diagnostic,
        'doctor_note': this.prescriptionNote,
        'medicine_items': medicine_items,
        'medical_info': this.selectedMedicalInfo.id,
      }
      let vm = this;
      this.isLoading += 1;
      if (value === true) {
        doctorService.createPrescription(data)
            .then(response => {
              if (response.status === 200) {
                console.log(response);
                vm.$refs.form.reset();
                vm.itemsTable = [];
                vm.patientPhoneNumber = "";
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
</style>
