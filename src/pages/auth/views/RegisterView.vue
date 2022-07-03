<template>
  <v-container fluid fill-height class="login__container">
    <register-form/>
  </v-container>
</template>

<script>

import RegisterForm from "@/components/RegisterForm";
export default {
  name: 'RegisterView',
  data() {
    return {

    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
    },
  },
  components: {RegisterForm},
  computed: {
  },
}
</script>

<style lang="scss" scoped>
.login__container {
  height: 100%;
}
</style>
