import axios from "axios";
import URL from "./api.js";

export function signUp(userSignUp) {
  return axios.post(`${URL}/signup`, userSignUp);
}

export function signIn(userSignin) {
  return axios.post(`${URL}/signin`, userSignin);
}

const requestAuthApi = {
  signUp,
  signIn
};

export default requestAuthApi;
