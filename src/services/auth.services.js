import axios from 'axios';
import Constants from '@/utils/constants';
// import Auth from '@/utils/auth'

export const authService = {
    refreshToken,
};

function refreshToken(refresh) {
    const data = new URLSearchParams();
    data.append('refresh', refresh);
    return axios({
        method: 'POST',
        url: `${Constants.SERVER}/token/refresh`,
        data: data,
    });
}


// function login(phone_number, password) {
//     const data = new URLSearchParams();
//     data.append('phone_number', phone_number);
//     data.append('password', password);
//     return axios({
//         method: 'POST',
//         url: `${Constants.SERVER}/token`,
//         data: data,
//     });
// }

// function getPatientInfo() {
//     return axios({
//         method: 'GET',
//         headers: Auth.getHeaderCookie(),
//         url: `${Constants.SERVER}/patients/a/info`
//     });
// }

// function getMedicineList(page, page_size, search) {
//     let params = {
//         page,
//         page_size,
//         name: search
//     };
//     return axios({
//         method: 'GET',
//         // headers: Auth.getHeaderCookie(),
//         url: `${Constants.SERVER}/medicines`,
//         params: params
//     });
// }

// function getPatientInfo(phone_number) {
//     Auth.isValidJwt(Auth.getHeaderCookie());
//     let params = {
//         phone_number
//     };
//     return axios({
//         method: 'GET',
//         headers: Auth.getHeaderCookie(),
//         url: `${Constants.SERVER}/doctors/a/patients`,
//         params: params
//     });
// }

// function resendEmail() {
//     return axios({
//         method: 'POST',
//         headers: Auth.getHeader(),
//         url: `${Constants.SERVER}/users/confirm`
//     })
// }
//
// function sendResetPasswordEmail(username, email) {
//     const data = new URLSearchParams();
//     data.append('username', username);
//     data.append('email', email);
//
//     return axios({
//         method: 'POST',
//         url: `${Constants.SERVER}/user/send-email-password`,
//         data: data
//     });
// }
