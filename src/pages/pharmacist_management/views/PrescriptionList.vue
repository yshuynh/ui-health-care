<template>
  <v-container fill-height class="prescription-list__container w-100">
    <v-card class="w-100">
      <v-card-title>
        {{ this.$t('prescriptionList') }}
      </v-card-title>
      <v-data-table
          :headers="headersTableMedicine"
          :items="searchResultMedicine"
          class="elevation-1 px-4"
          :options.sync="options"
          :server-items-length="totalMedicines"
      >
        <!--        <template v-slot:top>-->
        <!--          <v-text-field-->
        <!--              v-model="searchMedicine"-->
        <!--              :label="$t('searchMedicineName')"-->
        <!--              class="mx-4"-->
        <!--          ></v-text-field>-->
        <!--        </template>-->
        <template v-slot:[`item.action`]="{ item }">
          <v-btn icon @click="selectPrescription(item)">
            <v-icon :key="item.id">mdi-clipboard-text</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>


    <v-dialog v-model="showDetail" width="1200">
      <PrescriptionInfo :prescription-data="selectedPrescription" />
    </v-dialog>
  </v-container>
</template>

<script>

import {pharmacistService} from "@/pages/pharmacist_management/services/pharmacist.services";
import PrescriptionInfo from "@/components/PrescriptionInfo";

export default {
  name: 'LoginView',
  data() {
    return {
      showDetail: false,
      options: {},
      searchResultMedicine: [],
      totalMedicines: 0,
      isDialog: true,
      selectedPrescription: {},
      headersTableMedicine: [
        {text: this.$t('id'), value: 'id', width: '6%'},
        {text: this.$t('patientName'), value: 'patient.name', width: '15%'},
        {text: this.$t('diagnostic'), value: 'diagnostic'},
        // {text: this.$t('concentration'), value: 'concentration'},
        // {text: this.$t('usage'), value: 'usage'},
        // {text: this.$t('facility'), value: 'facility'},
        // {text: this.$t('country'), value: 'country'},
        {text: this.$t('action'), value: 'action', width: '10%'},
      ],
    }
  },
  mounted() {
  },
  methods: {
    getDataFromApi() {
      this.isLoading += 1;
      const {page, itemsPerPage} = this.options;
      pharmacistService.getPrescriptionList(page, itemsPerPage)
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
      this.selectedPrescription=item;
      this.showDetail = true;
    },
  },
  components: {PrescriptionInfo},
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
