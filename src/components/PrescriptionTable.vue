<template>
  <div class="w-100">
    <v-card class="w-100">
      <v-card-text>
        <v-card-title class="py-0 my-0">
          {{ this.$t('prescriptionList') }}
        </v-card-title>
      </v-card-text>
      <v-data-table
          :headers="headersTablePrescription"
          :items="searchResultPrescription"
          class="px-8"
          :options.sync="options"
          :server-items-length="totalPrescription"
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
      <PrescriptionInfo :prescription-data="selectedPrescription"/>
    </v-dialog>
  </div>
</template>

<script>

import PrescriptionInfo from "@/components/PrescriptionInfo";

export default {
  name: 'PrescriptionTable',
  props: {
    searchResultPrescription: Array,
    totalPrescription: Number,
  },
  data() {
    return {
      showDetail: false,
      options: {},
      isDialog: true,
      selectedPrescription: {},
      headersTablePrescription: [
        {text: this.$t('id'), value: 'id', width: '6%'},
        {text: this.$t('patientName'), value: 'patient.name', width: '15%'},
        {text: this.$t('doctor'), value: 'doctor.name'},
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
      const {page, itemsPerPage} = this.options;
      let data = {
        'page': page,
        'pageSize': itemsPerPage
      }
      this.$emit('fetchData', data);
    },
    selectPrescription(item) {
      this.selectedPrescription = item;
      this.showDetail = true;
    },
  },
  components: {PrescriptionInfo},
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    }
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
