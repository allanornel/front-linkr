import axios from 'axios';

import URL from './api.js';

function config(token){
    return { headers: { authorization : `Bearer ${token}` }}
}

function create (post, config) {
    return axios.post(`${URL}/post/create`, post, config);
}

function posts (token) {
    return axios.get(`${URL}/timeline`, config(token) );
}

const requestPostsApi = {
    create, posts
}

export default requestPostsApi;