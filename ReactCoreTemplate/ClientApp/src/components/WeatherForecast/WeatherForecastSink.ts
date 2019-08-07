import { matchPath } from 'react-router';
import { HttpClient } from '../../services';
import { sink, state, trigger, effect } from 'redux-sink';
import { globals } from '@services';
import { Location } from 'history';

@sink('weatherForecast')
export class WeatherForecastSink {
  @state public forecasts: any[] = [];
  @state public loading: boolean = false;
  @state public index: number = 0;
  @state public error?: Error;

  async loadingPipe(action: Promise<any>) {
    this.loading = true;
    this.error = undefined;
    try {
      return await action
    } catch (e) {
      this.error = e;
    }
    finally {
      this.loading = false;
    }
  }

  @trigger('navigation/location')
  async loadOnWeatherUrl(location: Location) {
    const matches = matchPath<{ index?: string }>(location.pathname, '/weather-forecast/:index?');
    if (!matches) return;

    const index = parseInt((matches.params && matches.params.index) || '') || 0;
    this.index = index;
    return this.loadWeather(index);
  }

  @effect
  async loadWeather(index: number) {
    const httpClient = new HttpClient(globals.axiosConfig);
    const forecasts = await this.loadingPipe(
      httpClient.get(`/api/SampleData/WeatherForecasts?startDateIndex=${index}`)
    );
    this.forecasts = forecasts && forecasts.data;
    return forecasts;
  }
}