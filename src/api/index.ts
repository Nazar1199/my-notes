import axios, {AxiosError} from 'axios';

export const api = axios.create({
  baseURL: 'https://dist.nd.ru/api'
});

export async function checkApiHealth() {
  try {
    const response = await api.head('/ping');
    console.log('API is healthy:', response.status);
  } catch (error) {
    console.error('API is not healthy:', error);
  }
}

export async function registerUser(email: string, password: string, confirmPassword: string) {
  try {
    const response = await api.post('/reg', {
      email,
      password,
      confirm_password: confirmPassword,
    });
    console.log('Registration successful:', response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
        console.error('Registration failed:', error.response?.data || error.message);
        throw error.response?.data || error.message;
    } else {
        console.error('Registration failed:', (error as Error).message || error);
        throw (error as Error).message || error;
    }
  }
}