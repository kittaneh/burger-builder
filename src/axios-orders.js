import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-3029b.firebaseio.com/'
});

export default instance;