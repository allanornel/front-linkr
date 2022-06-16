import axios from 'axios';
import URL from './api.js';

const token = 'fe24d84cacf36d73051fb806587368a1';
const config = {
    headers: {Authorization: `Bearer ${token}`} 
};

function create (post) {
    return axios.post(`${URL}/post/create`, {
        post, config
    });
}

const requestPostsApi = {
    create
}

export default requestPostsApi;