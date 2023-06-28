// ==========================================
//  Author: Khushalkumar Gondaliya
// ==========================================

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurant: null,
  token: null,
  role: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.restaurant = action.payload.restaurant;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    setLogout: (state) => {
      state.restaurant = null;
      state.token = null;
      state.role = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;

