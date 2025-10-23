import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchUsersRequest: (state) => { state.loading = true; },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createUserRequest: () => {},
    updateUserRequest: () => {},
    deleteUserRequest: () => {},
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  createUserRequest,
  updateUserRequest,
  deleteUserRequest,
} = usersSlice.actions;

export default usersSlice.reducer;
