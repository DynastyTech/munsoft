export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  municipality?: string;
  service?: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}

export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
}
