<template>
  <v-container>
    <image-picker :base-preview-image="doctor.avatar" :value.sync="avatar" @confirmed="onConfirmedUploadAvatar"
                  class="mb-4"/>
    <doctor-info :doctor-info="$store.state.doctor" @confirmedUpdateInfo="confirmedUpdateInfo"/>
    <my-snackbar :is-show.sync="showSnackbar" :text="snackBarText" :type="snackBarType"></my-snackbar>
  </v-container>
</template>

<script>

// import constants from "@/utils/constants";
import {doctorService} from "@/pages/doctor_management/services/doctor.services";
import MySnackbar from "@/components/MySnackbar";
import DoctorInfo from "@/components/DoctorInfo";
import ImagePicker from "@/components/ImagePicker";
// import {doctorService} from "@/pages/doctor_management/services/doctor.services";

export default {
  name: 'DoctorInfoView',
  data() {
    return {
      avatar: null,
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
  watch: {
    '$store.state.doctor': function () {
      this.doctor = Object.assign({}, this.$store.state.doctor);
    },
    avatar(file) {
      console.log(file)
    }
  },
  methods: {
    onConfirmedUploadAvatar(file) {
      console.log(file);
      let vm = this;
      this.isLoading += 1;
      doctorService.requestUploadAvatarFile(file.name)
          .then(response => {
            console.log(response);
            vm.isLoading += 1;
            doctorService.uploadAvatarToAWS(response.data.url, response.data.fields, file)
                .then(res => {
                  console.log(res);
                  vm.showSnackbarFunc(vm.$t('saveSuccess'), "success");
                  this.$router.go();
                })
                .catch(error => {
                  console.log(error);
                  vm.showSnackbarFunc(vm.$t('didError'), "error");
                })
                .finally(() => {
                  vm.isLoading -= 1
                });
          })
          .catch(error => {
            console.log(error);
            vm.showSnackbarFunc(vm.$t('didError'), "error");
          })
          .finally(() =>
              vm.isLoading -= 1
          );
    },
    confirmedUpdateInfo(data) {
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
  },

  components: {ImagePicker, DoctorInfo, MySnackbar},

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
  mounted() {
    this.doctor = Object.assign({}, this.$store.state.doctor);
  }
}
</script>


<style lang="scss" scoped>
</style>
