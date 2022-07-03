import axios from 'axios';
import Constants from '@/utils/constants';
import Auth from '@/utils/auth'

export const userService = {
    login,
    getPatientInfo,
    registerHospital,
    registerDrugstore,
    // resendEmail,
    // sendResetPasswordEmail
};

function login(phone_number, password) {
    const data = new URLSearchParams();
    data.append('phone_number', phone_number);
    data.append('password', password);
    return axios({
        method: 'POST',
        url: `${Constants.SERVER}/token`,
        data: data,
    });
}

function getPatientInfo() {
    return axios({
        method: 'GET',
        headers: Auth.getHeaderCookie(),
        url: `${Constants.SERVER}/patients/a/info`
    });
}

function registerHospital(data) {
    return axios({
        method: 'PUT',
        url: `${Constants.SERVER}/hospitals/`,
        data: data
    });
}

function registerDrugstore(data) {
    return axios({
        method: 'PUT',
        url: `${Constants.SERVER}/drugstores/`,
        data: data
    });
}

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
