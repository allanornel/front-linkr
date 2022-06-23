import axios from 'axios';

import URL from './api';

function config(token){
    return { headers: { authorization : `Bearer ${token}` }}
}

function follower(token, from, to){
  return axios.get(`${URL}/ifollow?from=${from}&to=${to}`, config(token));
}

function requestFollow(token, from, to){
  return axios.post(`${URL}/follower`, {from, to}, config(token));
}

const requestFollower = {
  follower,
  requestFollow
}

export default requestFollower