<template>
  <v-container>
    <hospital-info :hospital-info="$store.state.hospital" @confirmedUpdateInfo="confirmedUpdateInfo"/>

<!--    <v-card v-html="getGgMapIframe(hospital.address)">-->
<!--    </v-card>-->
    <my-snackbar :is-show.sync="showSnackbar" :text="snackBarText" :type="snackBarType"></my-snackbar>
  </v-container>
</template>

<script>

// import constants from "@/utils/constants";
import {hospitalService} from "@/pages/hospital_management/services/hospital.services";
import MySnackbar from "@/components/MySnackbar";
import HospitalInfo from "@/components/HospitalInfo";
// import {hospitalService} from "@/pages/hospital_management/services/hospital.services";

export default {
  name: 'HospitalInfoView',
  data() {
    return {
      valid: false,
      alert: false,
      alertType: "error",
      alertMessage: "",
      showSnackbar: false,
      snackBarText: "",
      snackBarType: "success",
      hospital: {
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
    this.hospital = Object.assign({}, this.$store.state.hospital);
  },
  watch: {
    '$store.state.hospital': function () {
      this.hospital = Object.assign({}, this.$store.state.hospital);
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
    confirmedUpdateInfo(inputData) {
      console.log(this.hospital);
      let data = {
        'name': inputData.name,
        'address': inputData.address,
      };
      this.isLoading += 1;
      let vm = this;
      hospitalService.updateHospitalInfo(data)
          .then(response => {
            if (response.status === 200) {
              console.log(response);
              this.$store.commit('SET_HOSPITAL', response.data);
              this.showAlert('success', vm.$t('saveSuccess'));
              vm.showSnackbarFunc(vm.$t('saveSuccess'), "success");
            } else {
              this.showSnackbarFunc(vm.$t('didError'), 'error');
            }
          })
          .catch(error => {
            console.log(error);
            this.showSnackbarFunc(vm.$t('didError'), 'error');
          })
          .finally(() => {
            this.isLoading -= 1;
          });
    },
    getGgMapIframe(address) {
      return `<iframe src="https://maps.google.com/maps?q=${address}&output=embed" width="100%" height="600" style="display:block; border: 0;"></iframe>`
    },
  },

  components: {HospitalInfo, MySnackbar},

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
