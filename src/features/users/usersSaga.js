import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "./usersSlice";
import { getUsersAPI } from "../../api/userService";

function* fetchUsers(action) {
  try {
    const response = yield call(getUsersAPI,action.payload);
    yield put(fetchUsersSuccess({response:response.data,datapage:action.payload}));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

export default function* usersSaga() {
  yield takeLatest(fetchUsersRequest.type, fetchUsers);
}
