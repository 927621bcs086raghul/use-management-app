import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "./usersSlice";
import {
  getSingleUserRequest,
  getSingleUserSuccess,
  getSingleUserFailure,
} from "./usersSlice";
import {
  editUserRequest,
  editUserSuccess,
  editUserFailure,
} from "./usersSlice";
import { deleteUserRequest, deleteUserSuccess, deleteUserFailure } from "./usersSlice";
import { getUsersAPI } from "../../api/userService";
import { getSelectedUserAPI } from "../../api/userService";
import { putEditUserAPI } from "../../api/userService";
import { DeleteUserAPI } from "../../api/userService";

function* fetchUsers(action) {
  try {
    const response = yield call(getUsersAPI,action.payload);
    yield put(fetchUsersSuccess({response:response.data,datapage:action.payload}));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

function* getSelectedUser(action) {
  try {
    const response = yield call(getSelectedUserAPI, action.payload);
    yield put(getSingleUserSuccess({ response: response.data }));
  } catch (error) {
    yield put(getSingleUserFailure(error.message));
  }
}

function* editUser(action) {
  try {
    const payload = action.payload || {};
    const id = payload.id;
    let data = payload.data;
    const response = yield call(putEditUserAPI, id, data);
    yield put(editUserSuccess({ response: response.data,id:id }));
  } catch (error) {
    yield put(editUserFailure(error.message));
  }
}

function* deleteUser(action) {
  try {
    yield call(DeleteUserAPI, action.payload);
    yield put(deleteUserSuccess(action.payload));
  } catch (error) {
    yield put(deleteUserFailure(error.message));
  }
}

export default function* usersSaga() {
  yield takeLatest(fetchUsersRequest.type, fetchUsers);
  yield takeLatest(getSingleUserRequest.type, getSelectedUser);
  yield takeLatest(editUserRequest.type, editUser);
  yield takeLatest(deleteUserRequest.type, deleteUser);
}
