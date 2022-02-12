import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse }  from 'axios';
import { getToken, destroyToken } from '../helpers/jwtLocalStorage';

const API: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3030/api/',
    timeout: 10000,
    withCredentials: true,
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
});

// API.defaults.withCredentials = true;
API.interceptors.request.use(function (config: AxiosRequestConfig) {
    // Do something before request is sent
    const token = getToken();
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
}, function (error: AxiosError) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
API.interceptors.response.use(function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // const originalRequest = error.config
    // console.log(error);
    // console.log(originalRequest);
    if (error.response?.status === 401) {
        destroyToken();
        // deleteToken();
        // window.location = '/login';
    }
    if (error.response?.data) {
        console.log('handle error ', error.response.data.message)
        throw new Error(error.response.data.message);
    }
    return Promise.reject(error);
});

export default API;