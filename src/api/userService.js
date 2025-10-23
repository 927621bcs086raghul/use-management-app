
import axiosClient from './axiosClient';

export function LoginAPI(action) {
    console.log(action);
	return axiosClient.post('/login',
        action
    );
}

export function getUsersAPI(params) {
  return axiosClient.get('/users', {
    params, // example: { page: 1, per_page: 6 }
  });
}


