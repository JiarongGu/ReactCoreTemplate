import { match } from 'react-router';
import { HttpClient } from '../../services';
import { sink, state, reducer, trigger } from 'redux-sink';
import { httpConfigService } from '@services';
import { location } from '@decorators';

export class WeatherForecastState {
  forecasts: any[] = [];
  loading: boolean = false;
  index: number = 0;
  error?: Error;
}

@sink('weatherForecastSink')
export class WeatherForecastSink {
  @state
  state = new WeatherForecastState();

  @reducer
  setIndex(index: number) {
    return { ...this.state, index };
  }

  @reducer
  setForecasts(forecasts: Array<any>) {
    return { ...this.state, forecasts };
  }

  @reducer
  setLoading(loading: boolean) {
    return { ...this.state, loading };
  }

  async loadingPipe(action: Promise<any>) {
    this.setLoading(true);
    this.state.error = undefined;
    try {
      return await action
    } catch (e) {
      this.state.error = e;
    }
    finally {
      this.setLoading(false);
    }
  }
  
  @trigger('@@router/LOCATION_CHANGE', { fireOnInit: true })
  @location('/weather-forecast/:index?')
  async loadOnWeatherUrl(matches: match<{ index?: string }>) {
    if (!matches) return;
    const index = parseInt(matches.params.index || '') || 0;
    this.setIndex(index);

    const httpClient = new HttpClient(httpConfigService.config);
    const forecasts = await this.loadingPipe(
      httpClient.get(`/api/SampleData/WeatherForecasts?startDateIndex=${index}`)
    );
    this.setForecasts(forecasts && forecasts.data);
    return forecasts;
  }
}