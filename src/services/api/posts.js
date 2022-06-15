import axios from 'axios';
import URL from './api.js';
 

function create (post, config) {
    return axios.post(`${URL}/post/create`, {
        post, config
    });
}

const requestPostsApi = {
    create
}

export default requestPostsApi;