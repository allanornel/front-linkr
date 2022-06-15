import axios from "axios";
import URL from "./api.js";

export function signUp(userSignUp) {
  return axios.post(`${URL}/signup`, userSignUp);
}

const requestAuthApi = {
  signUp,
};

export default requestAuthApi;
