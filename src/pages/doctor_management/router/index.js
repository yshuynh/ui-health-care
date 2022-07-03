import Vue from 'vue'
import VueRouter from 'vue-router'
import CreatePrescription from "@/pages/doctor_management/views/CreatePrescription";
import DoctorInfoView from "@/pages/doctor_management/views/DoctorInfoView";
import PrescriptionList from "@/pages/doctor_management/views/PrescriptionListView";
import ChangePassword from "@/pages/doctor_management/views/ChangePassword";
import CreateMedicalInfo from "@/pages/doctor_management/views/CreateMedicalInfo";
import Constants from "@/utils/constants";
import Auth from "@/utils/auth";

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
    component: DoctorInfoView
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
    path: '/log_out',
    name: 'log_out',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL + 'doctor_management/',
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
