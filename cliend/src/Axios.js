import axios from 'axios';

const baseURL = 'frbots.com';

export const ImagePath = (imageId) => `${baseURL}images/${imageId}.jpg`;

const instance = axios.create({
    baseURL: baseURL,
    headers: { 'authorization': localStorage.getItem('accesstoken') }

});
export default instance