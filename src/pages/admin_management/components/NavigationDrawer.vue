<!--        :permanent="!$vuetify.breakpoint.xsOnly"-->
<!--        :mini-variant.sync="mini"-->

<template>
  <v-card class="elevation-1">
    <v-navigation-drawer
        app
        class="navigation-drawer__container"
        :stateless="this.$store.state.screen==='desktop'"
        :temporary="this.$store.state.screen==='mobile'"
        v-model="drawer"
        :mini-variant.sync="mini"
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://qr-code-eprescription-bucket.s3.ap-southeast-1.amazonaws.com/empty_avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>{{$t('admin')}}</v-list-item-title>

        <v-btn
            icon
            @click.stop="mini = !mini"
        >
<!--          <v-icon>mdi-chevron-left</v-icon>-->
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
<!--      <template v-slot:append>-->
<!--        <v-list dense nav>-->
<!--          <router-link-->
<!--              alt="log_out"-->
<!--              to="log_out"-->
<!--              tag="div">-->
<!--            <v-list-item link>-->
<!--              <v-list-item-icon>-->
<!--                <v-icon>mdi-logout</v-icon>-->
<!--              </v-list-item-icon>-->
<!--              <v-list-item-content>-->
<!--                <v-list-item-title>{{$t("logout")}}</v-list-item-title>-->
<!--              </v-list-item-content>-->
<!--            </v-list-item>-->
<!--          </router-link>-->
<!--        </v-list>-->
<!--      </template>-->
    </v-navigation-drawer>
  </v-card>
</template>


<script>

export default {
  name: "NavigationDrawer",
  data() {
    return {
      items: [
        {title: this.$t('personalInfo'), icon: 'mdi-account', to: 'personal_info'},
        {title: this.$t('changePassword'), icon: 'mdi-key-change', to:'change_password'},
        // {title: 'My Account', icon: 'mdi-home-city', to: 'about'},
        // {title: 'Users', icon: 'mdi-account-group-outline', to:'unknown'},
        // {title: this.$t('prescriptionList'), icon: 'mdi-clipboard-text', to:'prescription_list'},
        // {title: this.$t('createMedicalInfo'), icon: 'mdi-human', to:'create_medical_info'},
        // {title: this.$t('createPrescription'), icon: 'mdi-medical-bag', to:'create_prescription'},
        {title: this.$t('hospitalList'), icon: 'mdi-hospital-building', to:'hospital_list'},
        {title: this.$t('drugstoreList'), icon: 'mdi-store', to:'drugstore_list'},
      ],
    }
  },
  computed: {
    drawer: {
      get() {
        if (this.$store.state.screen === "mobile") {
          return this.$store.state.isShowNav;
        } else {
          return true;
        }
      },
      set(value) {
        if (this.$store.state.screen === "mobile") this.$store.commit('SET_IS_SHOW_NAV', value);
      }
    },
    mini: {
      get() {
        if (this.$store.state.screen === "mobile") {
          return false;
        } else {
          return !this.$store.state.isShowNav;
        }
      },
      set() {
        if (this.$store.state.screen === "desktop")  this.$store.commit('TOGGLE_IS_SHOW_NAV');
      }
    }
  }
  // watch: {
  //   '$store.state.isShowNav': function() {
  //     console.log(this.$store.state.isShowNav);
  //     this.drawer = this.$store.state.isShowNav;
  //   }
  // },
  // computed: {
  //   ...mapState([
  //     // map this.count to store.state.count
  //     'isShowNav'
  //   ])
  // },
}
</script>


<style lang="scss" scoped>
.navigation-drawer__container {
  height: 100%;
}
</style>
