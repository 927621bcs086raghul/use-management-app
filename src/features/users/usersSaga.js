// import { call, put, takeLatest } from "redux-saga/effects";
// import {
//   fetchUsersRequest,
//   fetchUsersSuccess,
//   fetchUsersFailure,
// } from "./usersSlice";
// import { getUsersAPI } from "../../api/userService";

// function* fetchUsers() {
//   try {
//     const response = yield call(getUsersAPI);
//     yield put(fetchUsersSuccess(response.data));
//   } catch (error) {
//     yield put(fetchUsersFailure(error.message));
//   }
// }

// export default function* usersSaga() {
//   yield takeLatest(fetchUsersRequest.type, fetchUsers);
// }
