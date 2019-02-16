import { matchPath } from 'react-router';
import { ApplicationState } from '@store/reducers';
import { createReducer, registerLocationHandler, createPromiseHandler, registerReducers } from '@utils';

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
    const httpSource = (store.getState() as ApplicationState).httpSources;
    const forecasts = await httpSource.watherForecasts.fetchdata((matches.params as any).startDateIndex);
    store.dispatch(watherForecastActions.setForcasts(forecasts));
  }
});

registerReducers<WatherForecastState>({
  stateName: 'watherForecast',
  initalState: new WatherForecastState(),
  reducerEvents: [setForecasts]
});

registerLocationHandler(forecastHandler);