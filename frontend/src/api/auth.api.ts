import axios from 'axios';
import { LoginCredentials, LoginResponse, RegisterResponse } from '../types/auth';

const API_BASE_URL = 'http://localhost:7000/api/auth';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for better error logging
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: {
        url: error.config?.url,
        method: error.config?.method,
      }
    });
    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await api.post('/login', credentials);
    return data;
  },

  register: async (credentials: LoginCredentials): Promise<RegisterResponse> => {
    const { data } = await api.post('/register', credentials);
    return data;
  }
};
