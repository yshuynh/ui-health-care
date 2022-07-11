import Vue from 'vue'
import VueRouter from 'vue-router'
import DrugstoreInfoView from "@/pages/drugstore_management/views/DrugstoreInfoView";
import ChangePassword from "@/pages/drugstore_management/views/ChangePassword";
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
    path: '/personal_info',
    name: 'personal_info',
    component: DrugstoreInfoView
  },
  {
    path: '/change_password',
    name: 'change_password',
    component: ChangePassword
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
