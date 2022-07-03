<template>
    <prescription-table
        :search-result-prescription="searchResultMedicine"
        :total-prescription="totalMedicines"
        @fetchData="getDataFromApi"
    />
</template>

<script>

import {doctorService} from "@/pages/doctor_management/services/doctor.services";
import PrescriptionTable from "@/components/PrescriptionTable";

export default {
  name: 'DoctorPrescriptionTable',
  data() {
    return {
      searchResultMedicine: [],
      totalMedicines: 0,
    }
  },
  mounted() {
  },
  methods: {
    getDataFromApi(data) {
      this.isLoading += 1;
      doctorService.getPrescriptionList(data.page, data.pageSize)
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
  },
  components: {PrescriptionTable},
  computed: {
    isLoading: {
      get() {
        return this.$store.state.isLoading;
      },
      set(value) {
        this.$store.commit("SET_IS_LOADING", value);
      }
    },
  }
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
