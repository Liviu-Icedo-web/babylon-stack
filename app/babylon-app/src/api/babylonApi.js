import axios from 'axios';

export default axios.create({
    baseURL: 'http://192.168.20.91:8020',
});