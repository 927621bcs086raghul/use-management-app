import { call, put, takeLatest } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure } from "./authSlice";
import { LoginAPI } from "../../api/userService";
function* handleLogin(action) {
  try {
    const response = yield call(LoginAPI, action.payload);
    console.log(response)
    localStorage.setItem("token", response.data.token);
    yield put(loginSuccess(response.data.token));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}
