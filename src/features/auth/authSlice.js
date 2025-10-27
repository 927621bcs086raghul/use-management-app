import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload;

    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutRequest: (state) => {
      state.loading=true;
    },
    logoutSuccess:(state)=>{
      state.loading=false;
      localStorage.removeItem("token");
    },
    logoutFailure:(state)=>{
      state.loading=false;
    }
  },
});

export const { loginRequest, loginSuccess, loginFailure, logoutRequest,logoutSuccess,logoutFailure } = authSlice.actions;
export default authSlice.reducer;
