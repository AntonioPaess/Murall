import axios, { AxiosInstance } from 'axios';

const httpClient: AxiosInstance = axios.create({
  baseURL: 'https://teste-murall-veros.onrender.com', 
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default httpClient;