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
import { getUsersAPI } from "../../api/userService";
import { getSelectedUserAPI } from "../../api/userService";

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

export default function* usersSaga() {
  yield takeLatest(fetchUsersRequest.type, fetchUsers);
  yield takeLatest(getSingleUserRequest.type, getSelectedUser);
}
