import { BASE_URL } from "@/constant"

import axios from 'axios';

const axiosApi = axios.create({
    baseURL: BASE_URL
});

// REQUEST
axiosApi.interceptors.request.use(
    (config) => {
        const accessToken = window.localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = accessToken;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

// RESPONSE

axiosApi.interceptors.response.use(
    async (response) => {
        const { accessToken, refreshToken } = response.data;
        // LOGIN
        if (accessToken) {
            window.localStorage.setItem('accessToken', accessToken);
        }
        if (refreshToken) {
            window.localStorage.setItem('refreshToken', refreshToken);
        }

        return response;
    },
    async (error) => {
        if (error?.response?.status !== 401) {
            return Promise.reject(error);
        }

        const originalConfig = error.config;

        if (error?.response?.status === 401 && !originalConfig.sent) {
            originalConfig.sent = true;
            try {
                // Trường hợp không có accessToken thì chuyển sang trang LOGIN
                const accessToken = window.localStorage.getItem('accessToken');
                if (!accessToken) {
                    window.location.href = '/login';
                    return Promise.reject(error);
                }
                const refreshToken = window.localStorage.getItem('refreshToken');
                if (refreshToken) {
                    const response = await axiosApi.post('/users/refresh-token', {
                        refreshToken: refreshToken,
                    });

                    const { accessToken } = response.data;
                    window.localStorage.setItem('accessToken', accessToken);

                    originalConfig.headers = {
                        ...originalConfig.headers,
                        authorization: accessToken,
                    };
                    return axiosApi(originalConfig);
                } else {
                    return Promise.reject(error);
                }
            } catch (err) {
                return Promise.reject(err);
            }
        }
    },
);

export { axiosApi };