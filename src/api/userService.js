
import axiosClient from './axiosClient';

export function LoginAPI(action) {
    console.log(action);
	return axiosClient.post('/login',
        action
    );
}


