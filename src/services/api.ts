// Use relative URL for Vercel deployment, or environment variable for development
const API_URL = import.meta.env.VITE_API_URL || '';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  municipality?: string;
  service?: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const submitContactForm = async (formData: ContactFormData): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: 'Failed to connect to server. Please try again later.',
    };
  }
};

export const getContactInfo = async () => {
  try {
    const response = await fetch(`${API_URL}/api/contact`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
};

export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/api/health`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Health check failed:', error);
    return { status: 'unhealthy' };
  }
};
