// src/api.js
import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

export const getProducts = () => axios.get(`${API_BASE_URL}/products`);
export const getProductById = (id) => axios.get(`${API_BASE_URL}/products/${id}`);
