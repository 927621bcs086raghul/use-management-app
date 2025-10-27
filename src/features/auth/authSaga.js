import { call, put, takeLatest } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure,logoutFailure,logoutSuccess,logoutRequest } from "./authSlice";
import { LoginAPI,LogoutAPI } from "../../api/userService";
import { message } from "antd";
function* handleLogin(action) {
  try {
    const response = yield call(LoginAPI, action.payload);
    localStorage.setItem("token", response.data.token);
    yield put(loginSuccess(response.data.token));
    message.success("you logged in successfully");

  } catch (error) {
    yield put(loginFailure(error.message));
    message.error(error?.response?.data?.error || "login failed")
  }
}

function* handleLogout(){
  try{
    yield call(LogoutAPI)
    yield put(logoutSuccess());
    message.success("you logged out successfully");
    window.location.reload();
  }
  catch{
    yield put(logoutFailure());
    message.error("logout failed");

  }
}
export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logoutRequest.type, handleLogout);

}
