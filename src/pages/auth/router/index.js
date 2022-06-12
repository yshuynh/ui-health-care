import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from "@/pages/auth/views/LoginView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL + 'auth/',
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
