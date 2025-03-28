import axios from 'axios';
import { LoginCredentials, LoginResponse, RegisterResponse } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL;

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
