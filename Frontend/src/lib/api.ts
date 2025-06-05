import axios, { AxiosInstance } from 'axios';

const httpClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080', 
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        
        config.headers.Authorization = token.startsWith('Bearer ') 
          ? token 
          : `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    
    if (typeof window !== 'undefined') {
      if (error.response?.status === 401 || error.response?.status === 403) {
      
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        
        window.location.href = '/signin';
      }
    }
    return Promise.reject(error);
  }
);

export default httpClient;