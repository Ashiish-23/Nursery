import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "sasyavana_access_token";
const USER_KEY = "sasyavana_user";

interface User {
  id: string;
  email?: string;
  mobileNumber: string;
  fullName: string;
  role: "B2C_BUYER" | "B2B_BUYER" | "NURSERY_SELLER";
}

export const authStorage = {
  // Store JWT token
  async saveToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } catch (error) {
      console.error("Error saving token:", error);
      throw error;
    }
  },

  // Retrieve JWT token
  async getToken(): Promise<string | null> {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      return token;
    } catch (error) {
      console.error("Error retrieving token:", error);
      return null;
    }
  },

  // Remove JWT token
  async removeToken(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error("Error removing token:", error);
      throw error;
    }
  },

  // Store user info
  async saveUser(user: User): Promise<void> {
    try {
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error("Error saving user:", error);
      throw error;
    }
  },

  // Retrieve user info
  async getUser(): Promise<User | null> {
    try {
      const userJson = await SecureStore.getItemAsync(USER_KEY);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error("Error retrieving user:", error);
      return null;
    }
  },

  // Remove user info
  async removeUser(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(USER_KEY);
    } catch (error) {
      console.error("Error removing user:", error);
      throw error;
    }
  },

  // Clear all auth data (logout)
  async clearAll(): Promise<void> {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(TOKEN_KEY),
        SecureStore.deleteItemAsync(USER_KEY),
      ]);
    } catch (error) {
      console.error("Error clearing auth storage:", error);
      throw error;
    }
  },

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      return !!token;
    } catch (error) {
      console.error("Error checking authentication:", error);
      return false;
    }
  },
};
