import { AxiosRequestConfig } from 'axios';
import { HttpClient } from '@banbrick/react-utils';

export class WeatherForecastSource {
  _httpClient: HttpClient
  constructor(httpConfig?: AxiosRequestConfig) {
    this._httpClient = new HttpClient(httpConfig);
  }

  fetchdata = (index: number) => {
    return this._httpClient.get(`/api/SampleData/WeatherForecasts?startDateIndex=${index}`)
      .then((response) => {
        return response.data;
      });
  };
}