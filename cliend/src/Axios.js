import axios from 'axios';

//export baseURL 
export const baseURL = 'http://localhost:4000/';

const instance = axios.create({
    baseURL: baseURL,
    headers: { 'authorization': localStorage.getItem('accesstoken') }

});
export default instance