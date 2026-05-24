export interface SuccessEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ErrorDetail {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface ErrorEnvelope {
  success: boolean;
  error: ErrorDetail;
}

export const BASE_VERSION = '1.0.0';
