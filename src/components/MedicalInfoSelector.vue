<template>
  <div class="create-prescription__container">
    <v-fade-transition>
      <v-card>
        <v-card-text>
          <v-card-title>
            {{ $t("selectMedicalInfo") }}
          </v-card-title>
          <div class="px-5">
            <v-row>
              <v-col cols="12" class="py-0">
                <v-select
                    v-model="mySelectedMedicalInfo"
                    :items="medicalInfoList"
                    :label="$t('selectMedicalInfo')"
                    return-object
                ></v-select>
              </v-col>
            </v-row>
            <v-row v-if="!!mySelectedMedicalInfo">
              <v-col cols="12" md="3" sm="12" class="py-0">
                <v-text-field :label="this.$t('height')" v-model="mySelectedMedicalInfo.height"
                              disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="12" class="py-0">
                <v-text-field :label="this.$t('weight')" v-model="mySelectedMedicalInfo.weight"
                              disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="12" class="py-0">
                <v-text-field :label="this.$t('bodyTemperature')" v-model="mySelectedMedicalInfo.body_temperature"
                              disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="12" class="py-0">
                <v-text-field :label="this.$t('bloodGroup')" v-model="mySelectedMedicalInfo.blood_group"
                              disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12" class="py-0">
                <v-text-field :label="this.$t('systolicBloodPressure')"
                              v-model="mySelectedMedicalInfo.systolic_blood_pressure"
                              disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12" class="py-0">
                <v-text-field :label="this.$t('diastolicBloodPressure')"
                              v-model="mySelectedMedicalInfo.diastolic_blood_pressure"
                              disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12" sm="12" class="py-0">
                <v-textarea :label="this.$t('medicalHistory')"
                            v-model="mySelectedMedicalInfo.medical_history"
                            disabled
                ></v-textarea>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </v-fade-transition>
  </div>
</template>

<script>
import constants from "@/utils/constants";
import {doctorService} from "@/pages/doctor_management/services/doctor.services";
import jwt_decode from "jwt-decode";

export default {
  name: 'MedicalInfoSelector',
  props: {
    medicalInfoList: Array,
    selectedMedicalInfo: Object,
  },
  data() {
    return {
      qrDialog: false,
      patientId: 0,
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
        doctorService.getPatientInfoByToken(this.patientInfoToken, this.patientId)
            .then(response => {
              if (response.status === 200) {
                console.log("OKKK", response);
                this.patientInfo = response.data;
                // this.showSnackbarFunc(this.$t('success'), 'success');
              } else {
                // this.showSnackbarFunc(this.$t('didError'), 'error');
                this.errorMessagesPatientInfoToken = this.$t("phoneNumberNotFound");
              }
            })
            .catch(error => {
              console.log(error);
              this.errorMessagesPatientInfoToken = this.$t("phoneNumberNotFound");
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
      this.errorMessagesPatientInfoToken = '';
      if (this.$refs.form) this.$refs.form.reset();
    },
    confirmedDialog(value) {
      if (!this.checkValidToken()) return;
      if (value !== true) return null;
      this.isLoading += 1;
      doctorService.createMedicalInfo(this.patientInfoToken, this.patientInfo.medical_info)
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
  components: {},
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
    mySelectedMedicalInfo: {
      get() {
        return this.selectedMedicalInfo
      },
      set(value) {
        this.$emit('update:selectedMedicalInfo', value);
      }
    }
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
