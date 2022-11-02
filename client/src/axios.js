import axios from 'axios';

const baseURL = 'http://localhost:4000/';

export const ImagePath = `${baseURL}images/`;

const instance = axios.create({
    baseURL: `${baseURL}api/`,
    headers: {
        'Content-Type': 'application/json',
    }
});

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('accesstoken');
    if (token) {
        config.headers.authorization = token;
    }
    return config;
})

instance.interceptors.response.use(
    response => response,
    async error => {
        const prevRequest = error.config;
        if (error?.response?.status === 403) {
            prevRequest.sent=true;
            const { data } = await instance.put('/auth/refreshtoken')
            if (data?.status) {
               localStorage.setItem('accesstoken', data.accesstoken) 
            }
            return instance(prevRequest);
        }
        return Promise.reject(error);
    }
);



export default instance