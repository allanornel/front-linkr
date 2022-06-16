import axios from 'axios';

import URL from './api.js';

function create (post, config) {
    return axios.post(`${URL}/post/create`, post, config);
}

function posts () {
    return axios.get(`${URL}/timeline`, config );
}

const requestPostsApi = {
    create, posts
}

export default requestPostsApi;