import axios from "axios";

import URL from "./api.js";

function config(token) {
  return { headers: { authorization: `Bearer ${token}` } };
}

function getHashtags() {
  return axios.get(`${URL}/hashtags`);
}

function getPostsByHashtag(hashtag, limit) {
  return axios.get(`${URL}/hashtags/${hashtag}`, {body: {limit}});
}

const requestHashtagsApi = {
  getHashtags,
  getPostsByHashtag,
};

export default requestHashtagsApi;
