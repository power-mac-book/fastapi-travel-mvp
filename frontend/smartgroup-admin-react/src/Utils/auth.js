// src/utils/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

export const saveToken = (token) => {
  localStorage.setItem("adminToken", token);
};

export const getToken = () => {
  return localStorage.getItem("adminToken");
};

export const logout = async () => {
  const token = getToken();
  if (token) {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  localStorage.removeItem("adminToken");
};

export const isLoggedIn = () => {
  return !!getToken();
};
