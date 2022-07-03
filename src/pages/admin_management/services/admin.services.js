import Constants from '@/utils/constants';
import Auth from '@/utils/auth'
import axios from "@/services/template.services";

export const adminService = {
    getMedicineList,
    getPatientInfo,
    getAdminInfo,
    updateAdminInfo,
    createPrescription,
    getPrescriptionList,
    changePassword,
    createMedicalInfo,
    getHospitalList,
    updateHospitalInfo,
    createHospitalAccount,
    activeUser,
    getDrugstoreList,
    updateDrugstoreInfo,
    createDrugstoreAccount,
};

function getAdminInfo() {
    return axios({
        method: 'GET',
        url: `${Constants.SERVER}/admins/a/info`,
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

function activeUser(user_id) {
    return axios({
        method: 'POST',
        url: `${Constants.SERVER}/users/a/${user_id}/active`,
        headers: Auth.getHeaderCookie()
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
        url: `${Constants.SERVER}/admins/a/prescriptions`,
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
        url: `${Constants.SERVER}/admins/a/patients`,
        params: params
    });
}

function updateAdminInfo(data) {
    return axios({
        method: 'PATCH',
        headers: Auth.getHeaderCookie(),
        url: `${Constants.SERVER}/admins/a/info`,
        data: data
    });
}

function createPrescription(data) {
    return axios({
        method: 'PUT',
        headers: Auth.getHeaderCookie(),
        url: `${Constants.SERVER}/admins/a/prescriptions`,
        data: data
    });
}

function createMedicalInfo(patient_id, data) {
    data['patient'] = patient_id;
    return axios({
        method: 'PUT',
        headers: Auth.getHeaderCookie(),
        url: `${Constants.SERVER}/admins/a/medical_infos`,
        data: data
    });
}

function getHospitalList(page, page_size) {
    let params = {
        page,
        page_size
    };
    return axios({
        method: 'GET',
        headers: Auth.getHeaderCookie(),
        url: `${Constants.SERVER}/admins/a/hospitals`,
        params: params
    });
}

function getDrugstoreList(page, page_size) {
    let params = {
        page,
        page_size
    };
    return axios({
        method: 'GET',
        headers: Auth.getHeaderCookie(),
        url: `${Constants.SERVER}/admins/a/drugstores`,
        params: params
    });
}

function updateHospitalInfo(hospital_id, data) {
    return axios({
        method: 'PATCH',
        headers: Auth.getHeaderCookie(),
        url: `${Constants.SERVER}/admins/a/hospitals/${hospital_id}`,
        data: data
    });
}

function updateDrugstoreInfo(hospital_id, data) {
    return axios({
        method: 'PATCH',
        headers: Auth.getHeaderCookie(),
        url: `${Constants.SERVER}/admins/a/drugstores/${hospital_id}`,
        data: data
    });
}

function createHospitalAccount(data) {
    return axios({
        method: 'PUT',
        headers: Auth.getHeaderCookie(),
        url: `${Constants.SERVER}/admins/a/hospitals`,
        data: data
    });
}

function createDrugstoreAccount(data) {
    return axios({
        method: 'PUT',
        headers: Auth.getHeaderCookie(),
        url: `${Constants.SERVER}/admins/a/drugstores`,
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
