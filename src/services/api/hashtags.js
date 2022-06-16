import axios from "axios";

import URL from "./api.js";

function config(token) {
  return { headers: { authorization: `Bearer ${token}` } };
}

function getHashtags() {
  return axios.get(`${URL}/hashtags`);
}

const requestHashtagsApi = {
  getHashtags,
};

export default requestHashtagsApi;
