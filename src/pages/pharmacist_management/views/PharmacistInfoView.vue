<template>
  <v-container>
    <image-picker :base-preview-image="pharmacist.avatar" :value.sync="avatar" @confirmed="onConfirmedUploadAvatar"
                  class="mb-4"/>
    <pharmacist-info :pharmacist-info="$store.state.pharmacist" @confirmedUpdateInfo="confirmedUpdateInfo"/>
    <my-snackbar :is-show.sync="showSnackbar" :text="snackBarText" :type="snackBarType"></my-snackbar>
  </v-container>
</template>

<script>

// import constants from "@/utils/constants";
import {pharmacistService} from "@/pages/pharmacist_management/services/pharmacist.services";
import MySnackbar from "@/components/MySnackbar";
import PharmacistInfo from "@/components/PharmacistInfo";
import ImagePicker from "@/components/ImagePicker";
// import {pharmacistService} from "@/pages/pharmacist_management/services/pharmacist.services";

export default {
  name: 'PharmacistInfoView',
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
  watch: {
    '$store.state.pharmacist': function () {
      this.pharmacist = Object.assign({}, this.$store.state.pharmacist);
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
      pharmacistService.requestUploadAvatarFile('avatar', file.name)
          .then(response => {
            console.log(response);
            vm.isLoading += 1;
            pharmacistService.uploadAvatarToAWS('avatar', response.data.url, response.data.fields, file)
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

  components: {ImagePicker, PharmacistInfo, MySnackbar},

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
    this.pharmacist = Object.assign({}, this.$store.state.pharmacist);
  }
}
</script>


<style lang="scss" scoped>
</style>
