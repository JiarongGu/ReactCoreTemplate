import { matchPath } from 'react-router';
import { createReducer, createPromiseHandler, ReduxRegistry } from '@utils';
import { WeatherForecastSource } from './WatherForecastSource';
import { ApplicationState } from '@store';

export class WatherForecastState {
  forecasts: any[];
}

export const setForecasts = createReducer<WatherForecastState, any[]>(
  (state, forecasts) => ({ ...state, forecasts })
);

export const watherForecastActions = { setForcasts: setForecasts.action };

export const forecastHandler = createPromiseHandler<Location>(async (store, payload) => {
  var matches = matchPath(payload.pathname,  { path: '/weather-forecast/:startDateIndex?'});
  if (matches) {
    const httpConfig = (store.getState() as ApplicationState).httpConfig.config;
    const forecasts = await new WeatherForecastSource(httpConfig).fetchdata((matches.params as any).startDateIndex);
    store.dispatch(watherForecastActions.setForcasts(forecasts));
  }
});

ReduxRegistry
  .registerReducer<WatherForecastState>({
    stateName: 'watherForecast',
    initalState: new WatherForecastState(),
    reducerEvents: [setForecasts]
  })
  .registerLocationHandler(forecastHandler);