import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  editUserRequest,
  editUserSuccess,
  editUserFailure,
  getSingleUserRequest,
  getSingleUserSuccess,
  getSingleUserFailure,
  createUserFailure,
  createUserRequest,
  createUserSuccess,
} from "./usersSlice";
import { deleteUserRequest, deleteUserSuccess, deleteUserFailure, } from "./usersSlice";
import { getUsersAPI,CreateUserAPI } from "../../api/userService";
import { getSelectedUserAPI } from "../../api/userService";
import { putEditUserAPI } from "../../api/userService";
import { DeleteUserAPI } from "../../api/userService";
import { message } from "antd";

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
    let response
    if(action.payload.id <=12){
     response = yield call(getSelectedUserAPI, action.payload.id);}
    else{
       response = {data:{data:action.payload}}
    }
    console.log(response)
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
    message.success("user edited successfully");
  } catch (error) {
    yield put(editUserFailure(error.message));
    message.error("user editer failed to edit")
  }
}

function* deleteUser(action) {
  try {
    yield call(DeleteUserAPI, action.payload);
    yield put(deleteUserSuccess(action.payload));
    message.success("user deleted successfully")
  } catch (error) {
    yield put(deleteUserFailure(error.message));
    message.error("user deleter failed to delete user")
  }
}
function* createUser(action){
  try{
    const response =yield call(CreateUserAPI ,action.payload);
    yield put(createUserSuccess(response.data,action.payload));
    message.success("user created successfully");
  }
  catch{
    yield put(createUserFailure());
    message.error("failed to create user");
  }
}
export default function* usersSaga() {
  yield takeLatest(fetchUsersRequest.type, fetchUsers);
  yield takeLatest(getSingleUserRequest.type, getSelectedUser);
  yield takeLatest(editUserRequest.type, editUser);
  yield takeLatest(deleteUserRequest.type, deleteUser);
  yield takeLatest(createUserRequest.type, createUser);

}
