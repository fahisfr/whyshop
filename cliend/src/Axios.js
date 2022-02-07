import axios from 'axios';

const baseURL = 'https://frbots.com/';

export const ImagePath = (imageId) => `${baseURL}images/${imageId}.jpg`;

const instance = axios.create({
    baseURL: 'https://frbots.com/api/',
    headers: {
        'authorization': localStorage.getItem('accesstoken'),
    },
});
instance.interceptors.response.use(
    response => response,
    async error => {
        if (error.response.status === 401 && error.response.data.message === 'Token not valid') {
            try {
                const { data } = await instance.put('/auth/refreshtoken')
                localStorage.setItem('accesstoken', data.accesstoken)
                window.location.reload('/')
            } catch (_error) {
                return Promise.reject(error)
            }
        }
        return Promise.reject(error);
    }
);



export default instance