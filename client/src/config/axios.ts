import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse }  from 'axios';
import { destroyUserToken, updateToken, getToken } from '../helpers/jwtLocalStorage';
import { refreshToken } from '../services/auth';

const API: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3030/api/',
    timeout: 10000,
    withCredentials: true,
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
});

API.interceptors.request.use(function (config: AxiosRequestConfig) {
    const accessToken = getToken();
    if (accessToken) {
        config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
}, function (error: AxiosError) {
    return Promise.reject(error);
});

API.interceptors.response.use(function (response: AxiosResponse) {
    return response;
},async (error: AxiosError) => {
    const originalRequest = error.config;
    const status = error.response ? error.response.status : null;
    if (status === 401 && error.config.url !== '/auth/refresh-token') {
        console.log('refresh token')
        return refreshToken()
            .then(response => {
                console.log('new token received')
                updateToken(response.data.accessToken)
                return API(originalRequest);
            })
            .catch(err => {
                console.log('err refresh',err)
                destroyUserToken();
                window.location.replace('/auth/login')
            });
    }
    return Promise.reject(error);
});

export default API;