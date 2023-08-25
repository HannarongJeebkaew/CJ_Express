import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // แก้ไขเป็น URL ของ Backend ของคุณ
});

export const registerUser = async (username: string, email: string, password: string) => {
  return await api.post('/register', { username, email, password });
};

export const loginUser = async (username: string, password: string) => {
  const response = await api.post('/login', { username, password });
  return response;
};