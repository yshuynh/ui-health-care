<template>
  <v-container>
    <drugstore-info :drugstore-info="$store.state.drugstore" @confirmedUpdateInfo="confirmedUpdateInfo"/>

<!--    <v-card v-html="getGgMapIframe(drugstore.address)">-->
<!--    </v-card>-->
    <my-snackbar :is-show.sync="showSnackbar" :text="snackBarText" :type="snackBarType"></my-snackbar>
  </v-container>
</template>

<script>

// import constants from "@/utils/constants";
import {drugstoreService} from "@/pages/drugstore_management/services/drugstore.services";
import MySnackbar from "@/components/MySnackbar";
import DrugstoreInfo from "@/components/DrugstoreInfo";
// import {drugstoreService} from "@/pages/drugstore_management/services/drugstore.services";

export default {
  name: 'DrugstoreInfoView',
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
    '$store.state.drugstore': function () {
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
    confirmedUpdateInfo(inputData) {
      console.log(this.drugstore);
      let data = {
        'name': inputData.name,
        'address': inputData.address,
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

  components: {DrugstoreInfo, MySnackbar},

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
