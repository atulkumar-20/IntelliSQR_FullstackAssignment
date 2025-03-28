export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    email: string;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}
