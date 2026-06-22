import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'sasyavana_access_token';
const USER_KEY = 'sasyavana_user';

interface User {
  id: string;
  email?: string;
  mobileNumber: string;
  fullName: string;
  role: 'B2C_BUYER' | 'B2B_BUYER' | 'NURSERY_SELLER';
}

export const authStorage = {
  async saveToken(token: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem(TOKEN_KEY, token);
        return;
      }

      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } catch (error) {
      console.error('Error saving token:', error);
      throw error;
    }
  },

  async getToken(): Promise<string | null> {
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem(TOKEN_KEY);
      }

      return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  },

  async removeToken(): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(TOKEN_KEY);
        return;
      }

      await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token:', error);
      throw error;
    }
  },

  async saveUser(user: User): Promise<void> {
    try {
      const userJson = JSON.stringify(user);

      if (Platform.OS === 'web') {
        localStorage.setItem(USER_KEY, userJson);
        return;
      }

      await SecureStore.setItemAsync(USER_KEY, userJson);
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  },

  async getUser(): Promise<User | null> {
    try {
      let userJson: string | null;

      if (Platform.OS === 'web') {
        userJson = localStorage.getItem(USER_KEY);
      } else {
        userJson = await SecureStore.getItemAsync(USER_KEY);
      }

      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('Error retrieving user:', error);
      return null;
    }
  },

  async removeUser(): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(USER_KEY);
        return;
      }

      await SecureStore.deleteItemAsync(USER_KEY);
    } catch (error) {
      console.error('Error removing user:', error);
      throw error;
    }
  },

  async clearAll(): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        return;
      }

      await Promise.all([
        SecureStore.deleteItemAsync(TOKEN_KEY),
        SecureStore.deleteItemAsync(USER_KEY),
      ]);
    } catch (error) {
      console.error('Error clearing auth storage:', error);
      throw error;
    }
  },

  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await this.getToken();
      return !!token;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  },
};