import axios from 'axios';

const baseURL = 'http://localhost:4000/';


export const ImagePath = (imageId) => `${baseURL}images/${imageId}.jpg`;

const instance = axios.create({
    baseURL: 'http://localhost:4000/api/',
    headers: { 'authorization': localStorage.getItem('accesstoken') }

});
export default instance