import axios from 'axios';

const baseURL = 'https://mo-pets.vercel.app';

const BASE_URL = axios.create({
  baseURL,
});

export default BASE_URL;