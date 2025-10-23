import axios from 'axios';

// Create an axios instance with sensible defaults
const axiosClient = axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // ignore localStorage errors in non-browser environments
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default axiosClient;
