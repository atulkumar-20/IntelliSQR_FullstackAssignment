import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import { LoginCredentials, ApiError, LoginResponse } from '../types/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

export const useAuth = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation<LoginResponse, AxiosError<ApiError>, LoginCredentials>({
    mutationFn: (credentials) => authApi.login(credentials),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success(`Welcome back, ${data.user.email}!`);
      navigate('/dashboard');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
    }
  });

  const registerMutation = useMutation<
    { message: string; user: { id: string; email: string } },
    AxiosError<ApiError>,
    LoginCredentials
  >({
    mutationFn: (credentials) => authApi.register(credentials),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate('/login');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
    }
  });

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    error: loginMutation.error || registerMutation.error,
    user,
  };
};
