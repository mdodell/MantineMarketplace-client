import axios, { AxiosRequestConfig } from 'axios';
import { getAPIUrl } from '@utils/urls';

const BASE_CONFIG: AxiosRequestConfig = {
  baseURL: getAPIUrl(),
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
};

export const axiosInstance = axios.create({
  ...BASE_CONFIG,
});

export const privateAxiosInstance = axios.create({
  ...BASE_CONFIG,
  withCredentials: true,
});
