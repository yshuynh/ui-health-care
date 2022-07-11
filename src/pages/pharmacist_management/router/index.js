import Vue from 'vue'
import VueRouter from 'vue-router'
import UpdatePrescription from "@/pages/pharmacist_management/views/UpdatePrescription";
import PharmacistInfoView from "@/pages/pharmacist_management/views/PharmacistInfoView";
import PrescriptionList from "@/pages/pharmacist_management/views/PrescriptionList";
import ChangePassword from "@/pages/pharmacist_management/views/ChangePassword";
import Constants from "@/utils/constants";
import Auth from "@/utils/auth";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/personal_info'
  },
  {
    path: '/update_prescription',
    name: 'update_prescription',
    component: UpdatePrescription
  },
  {
    path: '/personal_info',
    name: 'personal_info',
    component: PharmacistInfoView
  },
  {
    path: '/prescription_list',
    name: 'prescription_list',
    component: PrescriptionList
  },
  {
    path: '/change_password',
    name: 'change_password',
    component: ChangePassword
  },
  {
    path: '/log_out',
    name: 'log_out',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL + 'pharmacist_management/',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title;
  if (!Auth.isValidRefreshJwt()) {
    Vue.nextTick(() => {
      document.location.href = '/auth/login'
    });
  }
  if (to.name === 'log_out'){
    Vue.cookie.delete(Constants.ACCESS_TOKEN);
    Vue.cookie.delete(Constants.REFRESH_TOKEN);
    Vue.nextTick(() => {
      document.location.href = '/auth/login'
    })
  }
  next();
});

export default router
