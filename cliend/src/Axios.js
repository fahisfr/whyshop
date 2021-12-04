import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: { 'x-access-token': localStorage.getItem('accesstoken'),'y-refresh-token': localStorage.getItem('refreshtoken') } 

});
export default instance