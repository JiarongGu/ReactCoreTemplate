import Axios, { AxiosRequestConfig, AxiosInstance, AxiosPromise, AxiosInterceptorManager, AxiosResponse, CancelTokenSource } from 'axios';

export class HttpClient {
  _config?: AxiosRequestConfig;
  _axios: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    // initalize config if does not supply
    this.cancelTokenSource = Axios.CancelToken.source();
    const defualtConfig = { cancelToken: this.cancelTokenSource.token };
    const axiosConfig = config ? Object.assign({}, config, defualtConfig) : defualtConfig;

    this._config = axiosConfig;
    this._axios = Axios.create(this._config);
    this.interceptors = {
      request: this._axios.interceptors.request,
      response: this._axios.interceptors.response
    }
  }

  cancelTokenSource: CancelTokenSource;

  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse<any>>;
  };

  request<T>(config: AxiosRequestConfig): AxiosPromise<T> {
    return this._axios.request(config);
  }

  delete<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._axios.delete(url, config);
  }

  head<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._axios.head(url, config);
  }

  get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._axios.get(url, config);
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._axios.post(url, data, config);
  }

  put<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._axios.put(url, data, config);
  }

  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._axios.patch(url, data, config);
  }
}