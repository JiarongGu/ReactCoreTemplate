import { matchPath } from 'react-router';
import { ReduxCreator } from '@utils';
import { WeatherForecastSource } from './WatherForecastSource';
import { ApplicationState } from '@store';

export class WatherForecastState {
  forecasts: any[];
}

const locationHanlder = async (store, payload) => {
  var matches = matchPath(payload.pathname,  { path: '/weather-forecast/:startDateIndex?'});
  if (matches) {
    const httpConfig = (store.getState() as ApplicationState).httpConfig.config;
    const forecasts = await new WeatherForecastSource(httpConfig).fetchdata((matches.params as any).startDateIndex);
    store.dispatch(watherForecastActions.setForcasts(forecasts));
  }
};

export const watherForecastActions = new ReduxCreator<WatherForecastState>('watherForecast', new WatherForecastState())
  .addReducer((state, forecasts) => ({ ...state, forecasts }), 'setForcasts')
  .addLocationHandler(locationHanlder)
  .build();