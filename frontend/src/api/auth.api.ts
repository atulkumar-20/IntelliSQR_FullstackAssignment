import axios from 'axios';
import { LoginCredentials, LoginResponse, RegisterResponse } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7000/api/auth';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false, // Changed from true to false
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const { data } = await api.post('/login', credentials);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (credentials: LoginCredentials): Promise<RegisterResponse> => {
    try {
      const { data } = await api.post('/register', credentials);
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
};
