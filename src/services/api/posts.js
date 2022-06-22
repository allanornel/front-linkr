import axios from "axios";

import URL from "./api.js";

function config(token) {
    return {
        headers: {Authorization: `Bearer ${token}`} 
    } ;
}

function create(post, config) {
  return axios.post(`${URL}/post/create`, post, config);
}

function posts(token, limit) {
  return axios.post(`${URL}/timeline`, {limit}, config(token));
}

function postsTotal(token) {
    return axios.get(`${URL}/poststotal`, config(token));
}

function userPosts(token, userId) {
  return axios.get(`${URL}/user/${userId}`, config(token));
}

function deletePost(token, idPost) {
  return axios.delete(`${URL}/post/${idPost}`, config(token));
}

function editPost(token, idPost, objEdit) {
  return axios.put(`${URL}/post/${idPost}`, objEdit, config(token));
}

function getAllUsers(token) {
  return axios.get(`${URL}/users`, config(token));
}

const requestPostsApi = {
  create,
  posts,
  userPosts,
  deletePost,
  editPost,
  getAllUsers,
  postsTotal
};

export default requestPostsApi;
