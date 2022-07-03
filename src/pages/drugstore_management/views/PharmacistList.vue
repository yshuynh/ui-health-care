<template>
  <v-container fill-height class="prescription-list__container w-100">
    <v-card class="w-100">
      <v-card-text>
        <v-card-title class="mb-2">
          <v-row>
            <v-col cols="12" md="9" sm="12" class="py-0">
              {{ this.$t('pharmacistList') }}
            </v-col>
            <v-col cols="12" md="3" sm="12" class="py-0">
              <v-btn
                  color="primary"
                  width="100%"
                  @click="showDialogCreateAccount=true">
                {{ $t("createAccount") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
      </v-card-text>
      <v-data-table
          :headers="headersTablePharmacist"
          :items="searchResultMedicine"
          class="px-4"
          :options.sync="options"
          :server-items-length="totalMedicines"
      >
        <template v-slot:[`item.user.is_active`]="{ item }">
          <v-checkbox
              @click.native.prevent.stop.capture="activeUser(item)"
              :key="item.id" :input-value="item.user.is_active">mdi-clipboard-text
          </v-checkbox>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <v-btn icon @click="selectPrescription(item)">
            <v-icon :key="item.id">mdi-clipboard-text</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>


    <v-dialog v-model="showDetail" width="1200">
      <pharmacist-info :pharmacist-info="selectedPharmacist" @confirmedUpdateInfo="confirmedUpdatePharmacistInfo"/>
    </v-dialog>

    <v-dialog v-model="showDialogCreateAccount" width="800">
      <create-account @onSubmit="submitedCreatePharmacistAccount"/>
    </v-dialog>

    <my-snackbar :is-show.sync="showSnackbar" :text="snackBarText" :type="snackBarType"></my-snackbar>
  </v-container>
</template>

<script>

import {drugstoreService} from "@/pages/drugstore_management/services/drugstore.services";
import PharmacistInfo from "@/components/PharmacistInfo";
import CreateAccount from "@/components/CreateAccount";
import MySnackbar from "@/components/MySnackbar";

export default {
  name: 'PharmacistListView',
  data() {
    return {
      showSnackbar: false,
      snackBarText: "",
      snackBarType: "success",
      showDialogCreateAccount: false,
      showDetail: false,
      options: {},
      searchResultMedicine: [],
      totalMedicines: 0,
      isDialog: true,
      selectedPharmacist: {},
      headersTablePharmacist: [
        {text: this.$t('id'), value: 'id', width: '6%'},
        {text: this.$t('pharmacistName'), value: 'name', width: '15%'},
        {text: this.$t('phoneNumber'), value: 'user.phone_number'},
        {text: this.$t('departmentDrugstore'), value: 'department'},
        {text: this.$t('isActive'), value: 'user.is_active', width: '10%'},
        {text: this.$t('action'), value: 'action', width: '10%'},
      ],
    }
  },
  mounted() {
  },
  methods: {
    activeUser(item) {
      console.log(item);
      let vm = this;
      this.isLoading += 1;
      drugstoreService.activeUser(item.user.id)
          .then(response => {
            if (response.status === 200) {
              vm.getDataFromApi();
              vm.showSnackbarFunc(vm.$t('success'), 'success');
            } else {
              console.log(response);
              // vm.showSnackbarFunc(vm.$t('error'), 'error');
              vm.showSnackbarFunc(vm.$t(response.response.data.detail), 'error');
            }
          })
          .catch(error => {
            console.log(error);
            // vm.showSnackbarFunc(vm.$t('error'), 'error');
            vm.showSnackbarFunc(vm.$t(error.response.data.detail), 'error');
          })
          .finally(() => {
                this.isLoading -= 1;
              }
          );
    },
    showSnackbarFunc(message, type) {
      this.snackBarText = message;
      this.snackBarType = type;
      this.showSnackbar = true;
    },
    submitedCreatePharmacistAccount(data) {
      console.log(data);
      this.isLoading += 1;
      let vm = this;
      drugstoreService.createPharmacistAccount(data)
          .then(response => {
            if (response.status === 200) {
              vm.getDataFromApi();
              vm.showSnackbarFunc(vm.$t('success'), 'success');
            } else {
              console.log(response);
              // vm.showSnackbarFunc(vm.$t('error'), 'error');
              vm.showSnackbarFunc(vm.$t(response.response.data.detail), 'error');
            }
          })
          .catch(error => {
            console.log(error);
            // vm.showSnackbarFunc(vm.$t('error'), 'error');
            vm.showSnackbarFunc(vm.$t(error.response.data.detail), 'error');
          })
          .finally(() => {
                this.isLoading -= 1;
                vm.showDialogCreateAccount = false;
              }
          );
    },
    confirmedUpdatePharmacistInfo(data) {
      let vm = this;
      this.isLoading += 1;
      console.log(data);
      drugstoreService.updatePharmacistInfo(this.selectedPharmacist.id, data)
          .then(response => {
            if (response.status === 200) {
              vm.showDetail = false;
              vm.getDataFromApi();
              vm.showSnackbarFunc(vm.$t('success'), 'success');
            } else {
              vm.showSnackbarFunc(vm.$t('error'), 'error');
            }
          })
          .catch(error => {
            console.log(error);
            vm.showSnackbarFunc(vm.$t('error'), 'error');
          })
          .finally(() => {
                this.isLoading -= 1;
              }
          );
    },
    getDataFromApi() {
      this.isLoading += 1;
      const {page, itemsPerPage} = this.options;
      drugstoreService.getPharmacistList(page, itemsPerPage)
          .then(response => {
            this.searchResultMedicine = response.data.results;
            this.totalMedicines = response.data.total;
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
                this.isLoading -= 1;
              }
          );
    },
    selectPrescription(item) {
      this.selectedPharmacist = item;
      this.showDetail = true;
    },
  },
  components: {MySnackbar, CreateAccount, PharmacistInfo},
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
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.prescription-list {
  height: 100%;
}

.w-100 {
  width: 100%;
}
</style>
