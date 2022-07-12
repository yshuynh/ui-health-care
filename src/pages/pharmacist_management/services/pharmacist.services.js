import axios from '@/services/template.services';
import Constants from '@/utils/constants';
import Auth from '@/utils/auth'
// import {authService} from "@/services/auth.services";

export const pharmacistService = {
    // getPatientInfo,
    getMedicineList,
    getPatientInfo,
    getPharmacistInfo,
    updatePharmacistInfo,
    createPrescription,
    getPrescriptionList,
    changePassword,
    createMedicalInfo,
    updatePrescription,
    getPrescriptionByToken,
    requestUploadAvatarFile,
    uploadAvatarToAWS
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

function getPharmacistInfo() {
    return axios({
        method: 'GET',
        url: `${Constants.SERVER}/pharmacists/a/info`,
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
        url: `${Constants.SERVER}/pharmacists/a/prescriptions`,
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
        url: `${Constants.SERVER}/pharmacists/a/patients`,
        params: params
    });
}

function updatePharmacistInfo(data) {
    return axios({
        method: 'PATCH',
        headers: Auth.getHeaderCookie(),
        url: `${Constants.SERVER}/pharmacists/a/info`,
        data: data
    });
}

function createPrescription(data) {
    return axios({
        method: 'PUT',
        headers: Auth.getHeaderCookie(),
        url: `${Constants.SERVER}/pharmacists/a/prescriptions`,
        data: data
    });
}

function createMedicalInfo(patient_id, data) {
    data['patient'] = patient_id;
    return axios({
        method: 'PUT',
        headers: Auth.getHeaderCookie(),
        url: `${Constants.SERVER}/pharmacists/a/medical_infos`,
        data: data
    });
}

function updatePrescription(prescription_id, token, data) {
    console.log(data);
    return axios({
        method: 'PATCH',
        headers: Auth.getHeaderCookie(),
        url: `${Constants.SERVER}/pharmacists/a/prescriptions/${prescription_id}`,
        data: data,
        timeout: 5000,
    });
}

function getPrescriptionByToken(prescription_id, token, data) {
    // const data = new URLSearchParams();
    // data.append('prescription_token', token);
    return axios({
        method: 'POST',
        headers: Auth.getHeaderCookie(),
        url: `${Constants.SERVER}/pharmacists/a/prescriptions/${prescription_id}`,
        data: data,
        timeout: 5000,
    });
}

function requestUploadAvatarFile(awsName, fileName) {
    let queryParams = new URLSearchParams();
    const [, extension] = fileName.split('.');
    queryParams.append('ext', extension);
    queryParams.append('name', awsName);
    return axios({
        method: 'POST',
        url: `${Constants.SERVER}/files/a/avatar?${queryParams.toString()}`,
        headers: Auth.getHeaderCookie(),
    })
}

function uploadAvatarToAWS(awsName, link, fieldData, file) {
    let formData = new FormData();
    Object.keys(fieldData).forEach((key) => {
        formData.append(key, fieldData[key]);
    });
    let new_file = new File([file], awsName);
    console.log(new_file);
    formData.append('file', new_file);
    return axios({
        method: 'POST',
        url: link,
        data: formData,
    })
}