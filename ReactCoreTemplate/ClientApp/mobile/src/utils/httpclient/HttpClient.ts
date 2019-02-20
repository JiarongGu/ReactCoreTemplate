import Axios, { AxiosRequestConfig, AxiosInstance, AxiosPromise, AxiosInterceptorManager, AxiosResponse, CancelTokenSource } from 'axios';
import { formatRequestQuery } from './formatRequestQuery';

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

  request<TResponse>(config: AxiosRequestConfig): AxiosPromise<TResponse> {
    return this._axios.request(config);
  }

  delete<TResponse>(url: string, config?: AxiosRequestConfig): AxiosPromise<TResponse> {
    return this._axios.delete(url, config);
  }

  head<TResponse>(url: string, config?: AxiosRequestConfig): AxiosPromise<TResponse> {
    return this._axios.head(url, config);
  }

  get<TRequest, TResponse>(url: string, data?: TRequest, config?: AxiosRequestConfig): AxiosPromise<TResponse> {
    if (data)
      return this._axios.get(`${url}?${formatRequestQuery(data)}`, config);
    return this._axios.get(url, config);
  }

  post<TRequest, TResponse>(url: string, data?: TRequest, config?: AxiosRequestConfig): AxiosPromise<TResponse> {
    return this._axios.post(url, data, config);
  }

  put<TRequest, TResponse>(url: string, data?: TRequest, config?: AxiosRequestConfig): AxiosPromise<TResponse> {
    return this._axios.put(url, data, config);
  }

  patch<TRequest, TResponse>(url: string, data?: TRequest, config?: AxiosRequestConfig): AxiosPromise<TResponse> {
    return this._axios.patch(url, data, config);
  }
}