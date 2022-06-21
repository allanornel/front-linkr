import axios from 'axios';

import URL from './api.js';

function config(token) {
    return { headers: { authorization: `Bearer ${token}` } };
}

function create(token, comment, postId) {
    return axios.post(`${URL}/comment/${postId}`, comment, config(token));
}

function list(token, postId) {
    return axios.get(`${URL}/comment/${postId}`, config(token));
}

const requestCommentApi = {
    create,
    list
}

export default requestCommentApi;

