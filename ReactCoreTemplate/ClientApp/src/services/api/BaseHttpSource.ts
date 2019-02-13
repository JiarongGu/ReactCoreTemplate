import Axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

export class BaseHttpSource {
  _config?: AxiosRequestConfig;
  _axios: AxiosInstance;

  constructor(config?: AxiosRequestConfig)
  {
    this._config = config;  
    this._axios = Axios.create(this._config);
  }
}