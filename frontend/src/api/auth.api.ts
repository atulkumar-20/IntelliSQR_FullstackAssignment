import axios from 'axios';
import { LoginCredentials, LoginResponse, RegisterResponse } from '../types/auth';

const API_BASE_URL = 'http://localhost:7000/api/auth'; // Updated port to match backend

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await axios.post<LoginResponse>(
      `${API_BASE_URL}/login`,
      credentials
    );
    return data;
  },

  register: async (credentials: LoginCredentials): Promise<RegisterResponse> => {
    const { data } = await axios.post<RegisterResponse>(
      `${API_BASE_URL}/register`,
      credentials
    );
    return data;
  }
};
