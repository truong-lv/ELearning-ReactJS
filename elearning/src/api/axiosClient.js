// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests herex
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
    'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
// Handle token here ...
    const customToken = {};
    const token=localStorage.getItem('accessToken');
    if(token) {
        customToken.Authorization = `Bearer ${token}`;
    }
    return {
        ...config,
        headers: {
            ...customToken,
            ...config.headers
        }
    };
})

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {

        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
    });
export default axiosClient;