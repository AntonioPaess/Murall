import axios, { AxiosInstance } from 'axios';

const httpClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080', 
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 403) {
        localStorage.removeItem('token');
        window.location.href = '/signin';
      }
      return Promise.reject(error);
    }
  );

export default httpClient;  