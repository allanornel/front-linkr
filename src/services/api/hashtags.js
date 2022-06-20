import axios from "axios";

import URL from "./api.js";

function config(token) {
	return { headers: { authorization: `Bearer ${token}` } };
}

function getHashtags() {
	return axios.get(`${URL}/hashtags`);
}

function getPostsByHashtag(hashtag) {
	console.log(hashtag);
	return axios.get(`${URL}/hashtags/${hashtag}`);
}

const requestHashtagsApi = {
	getHashtags,
	getPostsByHashtag,
};

export default requestHashtagsApi;
