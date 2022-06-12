import Vue from 'vue';
import constants from './constants'
import jwt_decode from "jwt-decode";
import {authService} from "@/services/auth.services";

export default {
    getHeaderCookie(token = null) {
        if (token == null) {
            token = Vue.cookie.get(constants.ACCESS_TOKEN);
        }

        // if (!this.isValidJwt(token)) {
        //     this.refreshToken();
        //     token = Vue.cookie.get(constants.ACCESS_TOKEN);
        // }

        if (token) {
            return {
                Authorization: 'Bearer ' + token,
            };
        } else {
            return null;
        }
    },

    isValidJwt() {
        let jwt = Vue.cookie.get(constants.ACCESS_TOKEN);
        try {
            const data = jwt_decode(jwt);
            console.log(data);
            const exp = new Date(data.exp * 1000); // JS deals with dates in milliseconds since epoch
            const now = new Date();
            console.log(exp, now);
            return now < exp;
        } catch (err) {
            console.log(err);
            return false;
        }
    },

    isValidRefreshJwt() {
        let jwt = Vue.cookie.get(constants.REFRESH_TOKEN);
        try {
            const data = jwt_decode(jwt);
            console.log(data);
            const exp = new Date(data.exp * 1000); // JS deals with dates in milliseconds since epoch
            const now = new Date();
            console.log(exp, now);
            return now < exp;
        } catch (err) {
            console.log(err);
            return false;
        }
    },

    getTokenData(token) {
        try {
            const data = jwt_decode(token);
            return data;
        } catch (err) {
            return null;
        }
    },

    async refreshToken() {
        let data = null;
        let refresh = Vue.cookie.get(constants.REFRESH_TOKEN);
        await authService.refreshToken(refresh)
            .then(response => {
                Vue.cookie.set(constants.ACCESS_TOKEN, response.data.access);
                data = response.data.access;
                console.log("refresh token success")
            })
            .catch(err => {
                console.log(err);
            });
        return data;
    },
}
