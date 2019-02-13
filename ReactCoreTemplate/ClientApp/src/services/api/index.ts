import { WeatherForecasts } from './WeatherForecastsSrouce';
import Axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';

export class HttpSources {
  watherForecasts: WeatherForecasts;
  cancelTokenSource: CancelTokenSource;

  constructor(axiosConfig?: AxiosRequestConfig) {
    this.cancelTokenSource = Axios.CancelToken.source();

    const defualtConfig = { cancelToken: this.cancelTokenSource.token };
    const config = axiosConfig ? Object.assign({}, axiosConfig, defualtConfig) : defualtConfig;

    this.watherForecasts = new WeatherForecasts(config);
  }

  cancelAll = () => {
    this.cancelTokenSource.cancel();
  }
}