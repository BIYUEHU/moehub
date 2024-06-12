import axios from 'axios';
import { message } from 'antd';
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
    console.log(err);

    if (err instanceof Error) {
      message.useMessage()[0].error(`请求错误：${err.message}`);
    }
    return Promise.reject(err);
  }
);

export default http;
