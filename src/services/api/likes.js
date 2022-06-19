import axios from 'axios';

import URL from './api';

function config(token){
    return { headers: { authorization : `Bearer ${token}` }}
}

function postLike(token, postId){
    return axios.post(`${URL}/like`, {postId}, config(token));
}

function getLike(token, postId){
    return axios.get(`${URL}/like/${postId}`, config(token));
}

const requestLikesApi = {
    postLike,
    getLike
}

export default requestLikesApi;