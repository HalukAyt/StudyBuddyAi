import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
// API Base URL
const API_BASE_URL = "http://10.0.2.2:5088/api";  // HTTPS yerine HTTP

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json", // JSON formatında veri gönderiyoruz
  },
});

// Register function
export const register = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/register", { email, password });
    return response.data;
  } catch (error) {
    console.error("Register Error:", error);
    throw error;
  }
};

// Login function
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const { token } = response.data;

    // Token'ı AsyncStorage'a kaydediyoruz
    if (token) {
      await AsyncStorage.setItem('userToken', token);
    }

    return response.data; // Token'ı döndürür
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

// Logout function
export const logout = async () => {
  try {
    // Token'ı AsyncStorage'dan sil
    await AsyncStorage.removeItem('userToken');
    console.log("Logout successful");
  } catch (error) {
    console.error("Logout Error:", error);
    throw error;
  }
};

export default api;
