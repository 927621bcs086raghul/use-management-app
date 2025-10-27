import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    reflist: [],
    selectedUser: null,
    loading: false,
    error: null,
    total: 0,
    modalState:false,
  },
  reducers: {
    fetchUsersRequest: (state) => {
      state.loading = true;
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      if (action.payload.datapage.page == 1 && state.list.length == 0) {
        state.list = action.payload.response.data;
        state.reflist = state.list;
      } else if (action.payload.datapage.page > 1 && state.list.length <= 6) {
        const newList = [
          ...state.list,
          ...(Array.isArray(action.payload.response.data)
            ? action.payload.response.data
            : [action.payload.response.data]),
        ];
        state.list = newList;
        state.reflist = state.list;
      }
      state.total = action.payload.response.total;
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createUserSuccess: (state, action) => {
      state.loading = false;
      const newUser = action.payload;
      state.list = [newUser, ...(state.list || [])];
      state.reflist = [newUser, ...(state.reflist || [])];
      state.total = (state.total || 0) + 1;
      state.modalState=false
    },
    createUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserRequest: () => {},

    deleteUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      const id = action.payload
      state.list = (state.list || []).filter((u) => u.id !== id);
      state.reflist = (state.reflist || []).filter((u) => u.id !== id);
      state.total = state.total -1;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


    editUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    editUserSuccess: (state, action) => {
      state.loading = false;
      const updatedUser =  action.payload.response;
      const id=action.payload.id;
      state.list = state.list.map((u) => (u.id === id ? { ...u, ...updatedUser } : u));
      state.reflist = state.reflist.map((u) => (u.id === id ? { ...u, ...updatedUser } : u));
      state.modalState=false
    },
    editUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getSingleUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSingleUserSuccess: (state, action) => {
      state.loading = false;
      const user = action.payload.response.data;
      state.selectedUser = user || null;
      state.modalState=true;
    },
    getSingleUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.selectedUser = null;
    },

    searchUserFilter: (state, action) => {
      const search = action.payload;
      if (action.payload.trim() == "") {
        state.list = state.reflist;
        state.total =state.list.length;
      } else {
        const list = state.reflist;
        state.list = list?.filter(
          (user) =>
            user?.first_name
              ?.toLowerCase()
              .includes((search || "").toLowerCase()) ||
            user?.last_name
              ?.toLowerCase()
              .includes((search || "").toLowerCase())
        );
        state.total =state.list.length;
      }
    },
    modalCloser:(state)=>{
      state.modalState=false;
    },
    modalOpener:(state)=>{
      state.modalState=true;
      state.selectedUser=null;
    }
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  updateUserRequest,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  editUserRequest,
  editUserSuccess,
  editUserFailure,
  createUserFailure,
  createUserRequest,
  createUserSuccess,
  getSingleUserRequest,
  getSingleUserSuccess,
  getSingleUserFailure,
  searchUserFilter,
  modalCloser,
  modalOpener,
} = usersSlice.actions;

export default usersSlice.reducer;
