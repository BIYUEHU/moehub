import axios from 'axios';
import { notification } from 'antd';
import config from './config.js';

const http = axios.create({
  baseURL: config.url,
  timeout: 20000
});

http.interceptors.request.use(
  (config) => config,
  (err) => Promise.reject(err)
);

http.interceptors.response.use(
  (response) =>
    /*     if (response.status === 200 && typeof response.data === 'object' && typeof response.data.data === 'object') {
      return response.data.data;
    } */
    response.data,
  (err) => {
    notification.error({
      message: 'Http request error',
      description: err instanceof Error ? err.message : err || 'Unknown error',
      placement: 'topRight'
    });
    return Promise.reject(err);
  }
);

export default http;
