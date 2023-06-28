// ==========================================
//  Author: Khushalkumar Gondaliya
// ==========================================

import axios from "axios";
import { getInstance } from "../config/token";

export const login = async (email, password) => {
  const config = getInstance("POST", "/login", {
    email: email,
    password: password,
  });

  return axios(config)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
