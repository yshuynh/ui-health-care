const IS_DEV_MODE = process.env.NODE_ENV === 'development'
console.log(IS_DEV_MODE + "is dev")

export default {
    IS_DEV_MODE: IS_DEV_MODE,
    SERVER: IS_DEV_MODE ? "http://localhost:8000/api" : "/api",
    // SERVER: IS_DEV_MODE ? "https://yshuynh.pythonanywhere.com/api" : "/api",
    ACCESS_TOKEN: 'access',
    REFRESH_TOKEN: 'refresh',

    ROUTER_FORGOT_PASSWORD: {
        name: 'forgot_password',
        path: '/f_password'
    },

    DOCTOR_PATH: 'doctor_management',
    LOGOUT_PATH: 'log_out',
    PHARMACIST_PATH: 'pharmacist_management',
    HOSPITAL_PATH: 'hospital_management',
    PHARMACY_PATH: 'pharmacy_management',

    DOCTOR_ROLE: 'doctor',
    HOSPITAL_ROLE: 'hospital',
    PHARMACY_ROLE: 'pharmacy',
    PHARMACIST_ROLE: 'pharmacist',
};
