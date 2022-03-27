import axios from 'axios';

const baseURL = 'https://frbots.com/';

export const ImagePath = (imageId) => `${baseURL}images/${imageId}.jpg`;

const instance = axios.create({
    baseURL: 'https://frbots.com/api',
    headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken')? `${localStorage.getItem('accessToken')}` : '',
    }
});

instance.interceptors.response.use(
    response => response,
    async error => {
        const lastrequest = error.config;
        if (error?.response?.status === 403) {
            const { data } = await instance.put('/auth/refreshtoken')
            localStorage.setItem('accesstoken', data.accesstoken)
            window.location.reload()
        }
        return Promise.reject(error);
    }
);



export default instance