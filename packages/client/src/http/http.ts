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
  (response) => {
    if (response.data) response.config.headers['Content-Type'] = 'application/json';
    return response.data;
  },
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
