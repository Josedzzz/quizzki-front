// basic structure for a response
export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

// credentials to send with the request

export interface LoginCredentials {
  email: string;
  password: string;
}

// interfaces for the response format

export interface TokenId {
  token: string;
  id: string;
}
