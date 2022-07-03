import Vue from 'vue'
import VueRouter from 'vue-router'
import CreatePrescription from "@/pages/drugstore_management/views/CreatePrescription";
import DrugstoreInfoView from "@/pages/drugstore_management/views/DrugstoreInfoView";
import PrescriptionList from "@/pages/drugstore_management/views/PrescriptionList";
import ChangePassword from "@/pages/drugstore_management/views/ChangePassword";
import CreateMedicalInfo from "@/pages/drugstore_management/views/CreateMedicalInfo";
import Constants from "@/utils/constants";
import Auth from "@/utils/auth";
import PharmacistList from "@/pages/drugstore_management/views/PharmacistList";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/personal_info'
  },
  {
    path: '/create_prescription',
    name: 'create_prescription',
    component: CreatePrescription
  },
  {
    path: '/personal_info',
    name: 'personal_info',
    component: DrugstoreInfoView
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
    path: '/create_medical_info',
    name: 'create_medical_info',
    component: CreateMedicalInfo
  },
  {
    path: '/pharmacist_list',
    name: 'pharmacist_list',
    component: PharmacistList
  },
  {
    path: '/log_out',
    name: 'log_out',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL + 'drugstore_management/',
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
