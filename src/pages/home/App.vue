<template>
  <v-app v-resize="onResize">
    <app-bar @handleShowNavDrawer="handleShowNavDrawer"/>
    <v-main class="auth__container">
<!--      <v-container blue-grey lighten-5 fluid class="content__wrapper p-0 m-0">-->
        <v-progress-linear absolute
                           top
                           :indeterminate="isLoading"
                           :active="isLoading"
        ></v-progress-linear>
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
        <my-footer/>
<!--      </v-container>-->
    </v-main>
  </v-app>
</template>

<script>

import AppBar from "@/pages/home/components/AppBar";
import MyFooter from "@/pages/home/components/MyFooter";
export default {
  name: 'App',
  components: {MyFooter, AppBar},
  data: () => ({
    showNavDrawer: true,

  }),
  computed:{
    LIMIT_RESIZE: () => 960,
    isLoading : {
      get() {
        return this.$store.state.isLoading > 0;
      },
      set(value) {
        console.log(value);
        // this.$store.commit('updateMessage', value)
      }
    }
  },
  methods: {
    handleShowNavDrawer() {
      console.log("hello");
      this.showNavDrawer = !this.showNavDrawer;
    },
    onResize: function () {
      if(window.innerWidth <= this.LIMIT_RESIZE){
        this.$store.commit("SET_SCREEN", "mobile");
      } else {
        this.$store.commit("SET_SCREEN", "desktop");
      }
    }
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .15s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.content__wrapper {
  min-height: 100%;
}
</style>
