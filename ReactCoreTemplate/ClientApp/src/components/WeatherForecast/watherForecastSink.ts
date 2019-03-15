import { match } from 'react-router';
import { HttpClient } from '../../services';
import { sink, state, reducer, effect, trigger, retrigger } from 'redux-sink';
import { httpConfigService } from '@services';
import { location, debounced } from '@decorators';

export class WatherForecastState {
  forecasts: any[] = [];
  loading: boolean = false;
  index: number = 0;
  error?: Error;
}

@sink('watherForecast')
export class WatherForecastSink {
  @state
  state = new WatherForecastState();

  @reducer
  setIndex(index: number) {
    console.log(index, this.state.index);
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
    } catch(e) {
      this.state.error = e;
    }
    finally {
      this.setLoading(false);
    }
  }

  @effect
  @debounced(300)
  async loadWeatherForecast(index: number) {
    const httpClient = new HttpClient(httpConfigService.config);
    const forecasts = await this.loadingPipe(
      httpClient.get(`/api/SampleData/WeatherForecasts?startDateIndex=${index}`)
    );
    this.setForecasts(forecasts && forecasts.data)
  }


  @trigger('location_change')
  @location('/weather-forecast/:index?')
  async loadOnWeatherUrl(matches: match<{ index?: string}>) {
    const index = parseInt(matches.params.index || '') || 0;
    this.setIndex(index);
    await this.loadWeatherForecast(index);
  }
}