import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        pharmacist: {
            "id": 0,
            "user": {
                "id": 0,
                "phone_number": "",
                "email": "",
                "role": "",
                "created_at": "2022-06-06T20:08:48.230255Z",
                "updated_at": "2022-06-06T20:08:48.230290Z",
                "is_active": true
            },
            "hospital": {
                "id": 0,
                "user": {
                    "id": 0,
                    "phone_number": "",
                    "email": "",
                    "role": "",
                    "created_at": "2022-06-06T20:08:48.109787Z",
                    "updated_at": "2022-06-06T20:08:48.110220Z",
                    "is_active": true
                },
                "name": "",
                "address": "",
                "created_at": "2022-06-06T20:08:48.111207Z",
                "updated_at": "2022-06-06T20:08:48.112188Z"
            },
            "name": "",
            "gender": false,
            "created_at": "2022-06-06T20:08:48.230961Z",
            "updated_at": "2022-06-10T17:28:56.500080Z"
        },
        screen: "desktop",
        isShowNav: true,
        isLoading: 0
    },
    getters: {},
    mutations: {
        TOGGLE_IS_SHOW_NAV: function (state) {
            state.isShowNav = !state.isShowNav;
            console.log(state.isShowNav);
        },
        SET_IS_SHOW_NAV: function (state, value) {
            state.isShowNav = value;
            console.log(state.isShowNav);
        },
        SET_SCREEN: function (state, screen) {
            state.screen = screen;
            console.log(state.screen);
        },
        SET_IS_LOADING: function (state, isLoading) {
            if (isLoading >= 0) state.isLoading = isLoading;
        },
        SET_PHARMACIST: function (state, pharmacist) {
            state.pharmacist = pharmacist;
        }
    },
    actions: {
        toggleIsShowNav: async function (context) {
            context.commit('TOGGLE_IS_SHOW_NAV');
        },
        setScreen: async function (context, screen) {
            context.commit('SET_SCREEN', screen);
        },
    },
    modules: {}
})

// import {categoryService} from "@/pages/admin/services";
//
// export default ({
//   namespaced: true,
//   state: {
//     listCategories: [],
//     isLoading: true,
//   },
//   getters: {},
//   mutations: {
//     SET_LIST_CATEGORIES: function (state, listCategories) {
//       state.listCategories = [...listCategories]
//     },
//     SET_LOADING: function (state, isLoading) {
//       state.isLoading = isLoading;
//     },
//   },
//   actions: {
//     getCategories: async function (context) {
//       context.commit('SET_LOADING', true);
//       await categoryService.getCategories()
//           .then( response => {
//             context.commit('SET_LIST_CATEGORIES',response.data);
//           })
//           .catch(error => console.log(error))
//           .finally(() => {
//             context.commit('SET_LOADING', false);
//           })
//     },
//   }
// })

