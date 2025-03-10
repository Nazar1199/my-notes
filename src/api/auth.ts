import {AxiosError} from 'axios';
import { api } from '.';
import { saveTokenToLocalStorage, removeTokenFromLocalStorage } from '../localStorage';

export async function loginUser(email: string, password: string) {
    try {
      const response = await api.post('/auth', {
        email,
        password,
      });
      saveTokenToLocalStorage(response.data);
      // console.log('Login successful:', response.data);
    } catch (error) {
        if (error instanceof AxiosError) {
          console.error('Login failed:', error.response?.data || error.message);
          throw error.response?.data || error.message;
        } else {
          console.error('Login failed:', (error as Error).message || error);
          throw (error as Error).message || error;
        }
    }
  }

  export async function getUserInfo(accessToken: string) {
  try {
    const response = await api.get('/auth', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('User info:', response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Failed to get user info:', error.response?.data || error.message);
    } else {
      console.error('Failed to get user info:', (error as Error).message || error);
    }
  }
}

export async function logoutUser(accessToken: string) {
  try {
    await api.delete('/auth', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    removeTokenFromLocalStorage();
    console.log('Logout successful');
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Logout failed:', error.response?.data || error.message);
    } else {
      console.error('Logout failed:', (error as Error).message || error);
    }
  }
}