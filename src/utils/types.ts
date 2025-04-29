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

export interface Subject {
  ID_MATERIA: number;
  NOMBRE: string;
}

export interface Topic {
  ID_TEMA: number;
  NOMBRE: string;
}
