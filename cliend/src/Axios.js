import axios from 'axios';

const baseURL = 'https://frbots.com/';


export const ImagePath = (imageId) => `${baseURL}images/${imageId}.jpg`;

const instance = axios.create({
    baseURL: 'https://frbots.com/api/',
    headers: { 'authorization': localStorage.getItem('accesstoken') }

});
export default instance