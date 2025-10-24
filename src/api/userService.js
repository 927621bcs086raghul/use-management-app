
import axiosClient from './axiosClient';

export function LoginAPI(action) {
    console.log(action);
	return axiosClient.post('/login',
        action
    );
}

export function getUsersAPI(params) {
  return axiosClient.get('/users', {
    params, 
  });
}

export function getSelectedUserAPI(params){
  return axiosClient.get(`/users/${params}`);
}

export function putEditUserAPI(id, payload) {
  return axiosClient.patch(`/users/${id}`, payload);
}

export function DeleteUserAPI(id) {
  return axiosClient.patch(`/users/${id}`);
}

