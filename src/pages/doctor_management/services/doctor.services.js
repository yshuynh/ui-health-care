import Constants from '@/utils/constants';
import Auth from '@/utils/auth'
import axios from "@/services/template.services";
// import {authService} from "@/services/auth.services";

export const doctorService = {
    // getPatientInfo,
    getMedicineList,
    getPatientInfo,
    getDoctorInfo,
    updateDoctorInfo,
    createPrescription,
    getPrescriptionList,
    changePassword,
    createMedicalInfo,
    // resendEmail,
    // sendResetPasswordEmail
};

// axios.interceptors.response.use(resp => resp, async error => {
//     if (error.response.status === 401 && !error.isRefreshed ) {
//         await Auth.refreshToken();
//         let headers = Auth.getHeaderCookie();
//         if (headers) {
//             axios.defaults.headers = Auth.getHeaderCookie();
//             return axios(error.config);
//         }
//         error.isRefreshed = true;
//         return error;
//     }
// });

function getDoctorInfo() {
    return axios({
        method: 'GET',
        url: `${Constants.SERVER}/doctors/a/info`,
        headers: Auth.getHeaderCookie(),
    });
}

function changePassword(old_password, new_password) {
    let data = {
        old_password,
        new_password
    };
    return axios({
        method: 'POST',
        url: `${Constants.SERVER}/users/a/change_password`,
        headers: Auth.getHeaderCookie(),
        data: data
    });
}

// function getPatientInfo() {
//     return axios({
//         method: 'GET',
//         headers: Auth.getHeaderCookie(),
//         url: `${Constants.SERVER}/patients/a/info`
//     });
// }

function getMedicineList(page, page_size, search) {
    let params = {
        page,
        page_size,
        name: search
    };
    return axios({
        method: 'GET',
        // headers: Auth.getHeaderCookie(),
        url: `${Constants.SERVER}/medicines`,
        params: params
    });
}

function getPrescriptionList(page, page_size) {
    let params = {
        page,
        page_size
    };
    return axios({
        method: 'GET',
        headers: Auth.getHeaderCookie(),
        url: `${Constants.SERVER}/doctors/a/prescriptions`,
        params: params
    });
}

function getPatientInfo(phone_number) {
    let params = {
        phone_number
    };
    return axios({
        method: 'GET',
        headers: Auth.getHeaderCookie(),
        url: `${Constants.SERVER}/doctors/a/patients`,
        params: params
    });
}

function updateDoctorInfo(data) {
    return axios({
        method: 'PATCH',
        headers: Auth.getHeaderCookie(),
        url: `${Constants.SERVER}/doctors/a/info`,
        data: data
    });
}

function createPrescription(data) {
    return axios({
        method: 'PUT',
        headers: Auth.getHeaderCookie(),
        url: `${Constants.SERVER}/doctors/a/prescriptions`,
        data: data
    });
}

function createMedicalInfo(patient_id, data) {
    data['patient'] = patient_id;
    return axios({
        method: 'PUT',
        headers: Auth.getHeaderCookie(),
        url: `${Constants.SERVER}/doctors/a/medical_infos`,
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
