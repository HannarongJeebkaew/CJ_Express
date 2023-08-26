import axios from 'axios';
import { useState } from 'react';

export const registerUser = async (username: string, email: string, password: string) => {
  return await axios.post(import.meta.env.VITE_REACT_APP_API+'/register', { username, email, password });
};

export const loginUser = async (username: string, password: string) => {
  return await axios.post(import.meta.env.VITE_REACT_APP_API+'/login', { username, password });
  
};
export const [data,setData] = useState()