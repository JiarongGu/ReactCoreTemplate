import { matchPath } from 'react-router';
import { ReduxCreator } from '@banbrick/react-utils';
import { WeatherForecastSource } from './WatherForecastSource';
import { ApplicationState } from '@store';
import { Store, MiddlewareAPI } from 'redux';
import { Location } from 'history';

export class WatherForecastState {
  forecasts: any[];
}

const locationHanlder = async (store: MiddlewareAPI<any, ApplicationState>, location: Location) => {
  var matches = matchPath(location.pathname,  { path: '/weather-forecast/:startDateIndex?'});

  if (matches) {
    const startDateIndex = (matches.params as any).startDateIndex;
    const httpConfig = store.getState().httpConfig.config;
    const forecasts = await new WeatherForecastSource(httpConfig).fetchdata(startDateIndex);

    store.dispatch(watherForecastActions.setForcasts(forecasts));
  }
};

export const watherForecastActions = 
  new ReduxCreator<WatherForecastState>('watherForecast', new WatherForecastState())
  .addReducer<any[]>((state, forecasts) => ({ ...state, forecasts }), 'setForcasts')
  .addLocationHandler(locationHanlder)
  .build();