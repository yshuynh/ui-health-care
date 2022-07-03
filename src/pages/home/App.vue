<template>
  <v-app>
    <!--    <v-app-bar-->
    <!--      app-->
    <!--      color="primary"-->
    <!--      dark-->
    <!--    >-->
    <!--      <div class="d-flex align-center">-->
    <!--        <v-img-->
    <!--          alt="Vuetify Logo"-->
    <!--          class="shrink mr-2"-->
    <!--          contain-->
    <!--          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"-->
    <!--          transition="scale-transition"-->
    <!--          width="40"-->
    <!--        />-->

    <!--        <v-img-->
    <!--          alt="Vuetify Name"-->
    <!--          class="shrink mt-1 hidden-sm-and-down"-->
    <!--          contain-->
    <!--          min-width="100"-->
    <!--          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"-->
    <!--          width="100"-->
    <!--        />-->
    <!--      </div>-->

    <!--      <v-spacer></v-spacer>-->

    <!--      <v-btn-->
    <!--        href="https://github.com/vuetifyjs/vuetify/releases/latest"-->
    <!--        target="_blank"-->
    <!--        text-->
    <!--      >-->
    <!--        <span class="mr-2">Latest Release</span>-->
    <!--        <v-icon>mdi-open-in-new</v-icon>-->
    <!--      </v-btn>-->
    <!--    </v-app-bar>-->

    <v-main class="auth__container">
      <v-container fluid class="wrapper">
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style lang="scss" scoped>
.auth__container {
  //noinspection CssUnknownTarget
  background-image: url('~@/assets/images/icon_pattern.png');
  background-repeat: repeat;
  background-size: 50%;
  justify-content: center;
  //background-size: cover;

  .wrapper {
    min-height: 100%;
    position: relative;
  }
}
</style>
