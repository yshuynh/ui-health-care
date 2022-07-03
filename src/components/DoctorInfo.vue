<template>
  <div>
    <v-form
        ref="form"
        v-model="valid"
    >
      <v-card>
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
              <v-col cols="12" md="12" sm="12" class="py-0">
                <v-text-field :label="this.$t('departmentHospital')" v-model="doctor.department"
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
    <ConfirmDialog :show-dialog.sync="showConfirmDialog"
                   @confirmedDialog="confirmedDialog"
                   :text="this.$t('confirmSaveInfo') + '?'"/>
  </div>
</template>

<script>

import ConfirmDialog from "@/components/ConfirmDialog";
// import constants from "@/utils/constants";
// import {doctorService} from "@/pages/doctor_management/services/doctor.services";

export default {
  name: 'DoctorInfo',
  props: {
    doctorInfo: Object,
  },
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
        'department': "",
      },
      rules: {
        required: [v => !!v || this.$t('thisFieldRequired')],
        notZero: [v => v > 0 || this.$t('thisFieldRequired')],
      },
      showConfirmDialog: false,
    }
  },
  mounted() {
    this.doctor = Object.assign({}, this.doctorInfo);
  },
  watch: {
    doctorInfo: function() {
      this.doctor = Object.assign({}, this.doctorInfo);
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
    confirmedDialog(value) {
      if (value === true) {
        console.log(this.doctor);
        let data = {
          'name': this.doctor.name,
          'gender': this.doctor.gender,
          'department': this.doctor.department,
        };
        this.$emit("confirmedUpdateInfo", data);
      }
    }
  },

  components: {ConfirmDialog},

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
