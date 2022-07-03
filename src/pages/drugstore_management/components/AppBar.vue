<template>
  <v-app-bar
      app
      color="white"
      dense
  >
    <v-app-bar-nav-icon @click="handleShowNav"/>
    <span>{{this.$t('drugstoreManagement')}}</span>
    <v-spacer></v-spacer>

    <router-link
        alt="log_out"
        to="log_out"
        tag="div">
      <v-btn
          target="_blank"
          text
      >
        <span class="mr-2">{{ $t('logout') }}</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </router-link>
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
.auth__container {
  //noinspection CssUnknownTarget
  background-image: url('~@/assets/images/login_background.jpg');
  justify-content: center;
  background-size: cover;

  .wrapper {
    min-height: 100%;
    position: relative;
  }
}
</style>
