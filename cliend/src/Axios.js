import axios from 'axios';


const baseURL = 'http://localhost:4000/';

export const ImagePath = (imageId) => `${baseURL}images/${imageId}.jpg`;

const instance = axios.create({
    baseURL: 'http://localhost:4000/api/',
    headers: {
        'authorization': localStorage.getItem('accesstoken'),
    },
    withCredentials: true
   
});
instance.interceptors.response.use(
    response => response,
    async error => {
        if (error.response.status === 401) {
            try {
                localStorage.removeItem('accesstoken')
                const { data } = await instance.put('/auth/refreshtoken', { withCredentials: true })
                localStorage.setItem('accesstoken', data.accesstoken)
                window.location.reload('/')
            } catch (_error) {
                localStorage.removeItem('accesstoken');
                return Promise.reject(error)
            }
        }
        return Promise.reject(error);
    }
);



export default instance