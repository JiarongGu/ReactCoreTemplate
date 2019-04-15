import { match } from 'react-router';
import { HttpClient } from '../../services';
import { sink, state, trigger } from 'redux-sink';
import { httpConfigService } from '@services';
import { location } from '@decorators';

@sink('weatherForecastSink')
export class WeatherForecastSink {
  @state
  forecasts: any[] = [];

  @state
  loading: boolean = false;

  @state
  index: number = 0;

  @state
  error?: Error;

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
  
  @trigger('@@router/LOCATION_CHANGE', { fireOnInit: true })
  @location('/weather-forecast/:index?')
  async loadOnWeatherUrl(matches: match<{ index?: string }>) {
    if (!matches) return;
    const index = parseInt(matches.params && matches.params.index || '') || 0;
    this.index = index;

    const httpClient = new HttpClient(httpConfigService.config);
    const forecasts = await this.loadingPipe(
      httpClient.get(`/api/SampleData/WeatherForecasts?startDateIndex=${index}`)
    );
    this.forecasts = forecasts && forecasts.data;
    return forecasts;
  }
}