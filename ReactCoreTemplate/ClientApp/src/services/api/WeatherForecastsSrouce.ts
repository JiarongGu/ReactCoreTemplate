import { BaseHttpSource } from './BaseHttpSource';

export class WeatherForecasts extends BaseHttpSource {
  fetchdata = (index: number) => {
    return this._axios.get(`/api/SampleData/WeatherForecasts?startDateIndex=${index}`)
      .then((response) => {
        return response.data;
      });
  };
}
