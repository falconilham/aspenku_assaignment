import axios from "axios";
import { API_KEY, AUTH } from "./API";

export default async function Get(type) {
  const api = `${API_KEY}${type}`;
  return axios.get(await api, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: AUTH,
    },
    body: JSON.stringify({
      name: "Hubot",
      login: "hubot",
    }),
  });
}
