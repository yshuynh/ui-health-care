<template>
    <div>
    <v-card >
      <v-card-text>
        <v-card-title class="mb-2">
          {{ $t("prescriptionInfo") }}
        </v-card-title>
        <div class="px-5">
          <v-row>
            <v-col cols="12" md="6" sm="12" class="py-0">
              <v-text-field :label="this.$t('patientName')" :value="prescriptionData.patient.name"
                            disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="12" class="py-0">
              <v-text-field :label="this.$t('dob')" :value="prescriptionData.patient.dob" disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="12" class="py-0">
              <v-text-field :label="this.$t('gender')" :value="prescriptionData.patient.gender?$t('male'):$t('female')" disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="12" class="py-0">
              <v-text-field :label="this.$t('phoneNumber')" :value="prescriptionData.patient.user.phone_number" disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="12" class="py-0">
              <v-text-field :label="this.$t('insuranceNumber')" :value="prescriptionData.patient.social_insurance" disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12" class="py-0">
              <v-text-field :label="this.$t('address')" :value="prescriptionData.patient.address" disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12" class="py-0">
              <v-text-field :label="this.$t('diagnostic')" :value="prescriptionData.diagnostic" disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12" class="py-0">
              <v-text-field :label="this.$t('prescriptionNote')" :value="prescriptionData.note" disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12" class="py-0">
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-data-table
                  :headers="headersTable"
                  :items="prescriptionData.medicine_items"
                  hide-default-footer
                  class="elevation-1"
              >
                <template v-slot:no-data>
                  <h3>There are no current products added on details.</h3>
                </template>
                <template v-slot:[`item.doctor_note`]="{ item }">
                  <v-textarea  v-model="item.doctor_note" :disabled="true"
                              :auto-grow="true"
                              rows="1"
                  >
                  </v-textarea>
                </template>
                <template v-slot:[`item.pharmacist_note`]="{ item }">
                  <v-textarea v-model="item.pharmacist_note" :disabled="true"
                              :auto-grow="true"
                              rows="1"
                  >
                  </v-textarea>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>

<!--    <v-card>-->
<!--      <v-card-text>-->
<!--        <v-card-title>-->
<!--          <v-row>-->
<!--            <v-col cols="12" md="9" sm="12" class="py-0">-->
<!--              {{ this.$t('medicineList') }}-->
<!--            </v-col>-->
<!--          </v-row>-->
<!--        </v-card-title>-->
<!--      </v-card-text>-->
<!--      <v-data-table-->
<!--          :headers="headersTable"-->
<!--          :items="prescriptionData.medicine_items"-->
<!--          hide-default-footer-->
<!--          class="elevation-1"-->
<!--      >-->
<!--        <template v-slot:no-data>-->
<!--          <h3>There are no current products added on details.</h3>-->
<!--        </template>-->
<!--      </v-data-table>-->
<!--    </v-card>-->
  </div>
</template>



<script>

export default {
  name: 'PrescriptionInfo',
  props: {
    prescriptionData: Object,
  },
  data() {
    return {
      options: {},
      totalMedicines: 0,
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
      headersTable: [
        {text: this.$t('id'), value: 'medicine.id'},
        {text: this.$t('medicineName'), value: 'medicine.name'},
        {text: this.$t('medicineTradeName'), value: 'medicine.trade_name'},
        {text: this.$t('concentration'), value: 'medicine.concentration'},
        {text: this.$t('usage'), value: 'medicine.usage'},
        {text: this.$t('amount'), value: 'amount', width: '10%'},
        {text: this.$t('doctorNote'), value: 'doctor_note'},
        {text: this.$t('pharmacistNote'), value: 'pharmacist_note'}
      ],
    }
  },
  mounted() {
  },
  methods: {
  },
  components: {},
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
