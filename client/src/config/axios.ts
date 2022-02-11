import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse }  from 'axios';

const clientInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3030/api/v1/',
    timeout: 10000,
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
});

const initAxios = () => {
    clientInstance.defaults.withCredentials = true;
    clientInstance.interceptors.request.use(function (config: AxiosRequestConfig) {
        // Do something before request is sent
        return config;
    }, function (error: AxiosError) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    clientInstance.interceptors.response.use(function (response: AxiosResponse) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error: AxiosError) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        console.log(error);
        if (error.response?.status === 401) {
            // deleteToken();
            // window.location = '/login';
        }
        return Promise.reject(error);
    });

    return clientInstance;
}

export default initAxios();