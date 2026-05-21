import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for standard success/error envelopes
api.interceptors.response.use(
  (response) => {
    // Check if the response follows the SuccessEnvelope structure { success: boolean, data: any }
    if (response.data && typeof response.data === 'object' && 'success' in response.data) {
      return response.data.data;
    }
    // For responses that are not envelopes, return the raw data
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.error?.message || 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);
