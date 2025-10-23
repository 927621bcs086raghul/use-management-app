import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
    total:0,
  },
  reducers: {
    fetchUsersRequest: (state) => { state.loading = true; },
    fetchUsersSuccess: (state, action) => {
        console.log(action.payload)
      state.loading = false;
      console.log(state.list)
      if(action.payload.datapage.page ==  1 && state.list.length == 0){
        state.list = action.payload.response.data;
      }
      else if(action.payload.datapage.page >1 && state.list.length == 6){
        const newList = [
  ...state.list,
  ...(Array.isArray(action.payload.response.data)
    ? action.payload.response.data
    : [action.payload.response.data]),
];

state.list = newList;
      }
      state.total=action.payload.response.total;
      console.log(state.list)
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
