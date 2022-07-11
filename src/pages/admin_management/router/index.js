import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminInfoView from "@/pages/admin_management/views/AdminInfoView";
import ChangePassword from "@/pages/admin_management/views/ChangePassword";
import Constants from "@/utils/constants";
import Auth from "@/utils/auth";
import HospitalList from "@/pages/admin_management/views/HospitalList";
import DrugstorelList from "@/pages/admin_management/views/DrugstorelList";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/change_password'
  },
  {
    path: '/personal_info',
    name: 'personal_info',
    component: AdminInfoView
  },
  {
    path: '/change_password',
    name: 'change_password',
    component: ChangePassword
  },
  {
    path: '/hospital_list',
    name: 'hospital_list',
    component: HospitalList
  },
  {
    path: '/drugstore_list',
    name: 'drugstore_list',
    component: DrugstorelList
  },
  {
    path: '/log_out',
    name: 'log_out',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL + 'admin_management/',
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
