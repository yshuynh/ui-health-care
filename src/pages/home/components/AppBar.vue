<template>
  <v-app-bar
      app
      color="white"
      dense
  >
    <span>Hệ thống đơn thuốc điện tử</span>
    <v-spacer></v-spacer>


    <v-btn
        href="auth/login"
        text
    >
      <span class="mr-2">Đăng nhập / Đăng ký</span>
      <v-icon>mdi-login</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: 'AppBar',

  data: () => ({
    //
  }),
  methods: {
    ...mapActions([
      'toggleIsShowNav' // map `this.add()` to `this.$store.dispatch('increment')`
    ]),
    handleShowNav() {
      this.toggleIsShowNav();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
