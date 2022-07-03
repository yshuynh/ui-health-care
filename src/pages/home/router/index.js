import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from "@/pages/home/views/HomeView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title;
  // let tokenData = Auth.getTokenData(Vue.cookie.get(Constants.REFRESH_TOKEN));
  // if (tokenData) {
  //   switch (tokenData.role) {
  //     case Constants.DOCTOR_ROLE:
  //       Vue.nextTick(() => {
  //         document.location.href = '/' + Constants.DOCTOR_PATH;
  //       });
  //       break;
  //     case Constants.PHARMACIST_ROLE:
  //       Vue.nextTick(() => {
  //         document.location.href = '/' + Constants.PHARMACIST_PATH;
  //       });
  //       break;
  //     case Constants.HOSPITAL_ROLE:
  //       Vue.nextTick(() => {
  //         document.location.href = '/' + Constants.HOSPITAL_PATH;
  //       });
  //       break;
  //   }
  // }

  next();
});

export default router
