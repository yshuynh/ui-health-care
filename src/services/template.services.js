import axios from 'axios';
import Auth from "@/utils/auth";

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !Auth.isValidJwt()) {
        if (!Auth.isValidRefreshJwt()) {
            document.location.href = '/auth/login';
            return error;
        }
        let token = await Auth.refreshToken();
        let headers = Auth.getHeaderCookie(token);
        if (headers) {
            console.log("===================");
            let config = error.config;
            config.headers = headers;
            return axios(config);
        }
    }
    return error;
});

export default axios;
