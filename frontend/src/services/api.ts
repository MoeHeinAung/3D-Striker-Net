import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export type SuccessEnvelope<T> = {
  success: boolean;
  data: T;
  message: string;
};

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for standard success/error envelopes
api.interceptors.response.use(
  (response) => {
    // Return the full Axios response object instead of unwrapping
    return response;
  },
  (error) => {
    const message = error.response?.data?.error?.message || 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);
