// ==========================================
//  Author: Khushalkumar Gondaliya
// ==========================================

import axios from "axios";
import { getInstance } from "../config/token";

export const register = async (data) => {
  const config = getInstance("POST", "/restaurant/register", data);

  return axios(config)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const update = async (data) => {
  const config = getInstance("PUT", "/restaurant/update/" + data.id, data);

  return axios(config)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const get = async (id) => {
  const config = getInstance("GET", "/restaurant/" + id);

  return axios(config)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
