import axios from 'axios';

import URL from './api.js';

function config(token) {
    return { headers: { authorization: `Bearer ${token}` } };
}

function create(token, comment, postId) {
    return axios.post(`${URL}/comment/${postId}`, comment, config(token));
}

const requestCommentApi = {
    create
}

export default requestCommentApi;

