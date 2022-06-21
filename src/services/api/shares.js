import axios from "axios";

import URL from "./api";

function config(token) {
  return { headers: { authorization: `Bearer ${token}` } };
}

function sharePost(token, postId) {
  return axios.post(`${URL}/share/${postId}`, {}, config(token));
}

function getSharesByPostId(token, postId) {
  return axios.get(`${URL}/share/${postId}`, config(token));
}

const requestSharesApi = {
  sharePost,
  getSharesByPostId,
};

export default requestSharesApi;
