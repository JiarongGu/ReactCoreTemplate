import { matchPath } from 'react-router';
import { ReduxCreator } from '@banbrick/react-utils';
import { WeatherForecastSource } from './WatherForecastSource';
import { ApplicationState } from '@store';
import { MiddlewareAPI } from 'redux';
import { Location } from 'history';

export class WatherForecastState {
  forecasts: any[];
  loading: boolean;
}

const locationHanlder = async (store: MiddlewareAPI<any, ApplicationState>, location: Location) => {
  var matches = matchPath(location.pathname,  { path: '/weather-forecast/:startDateIndex?'});
  if (matches) {
    const startDateIndex = (matches.params as any).startDateIndex;
    store.dispatch(watherForecastActions.loadWeatherForecast(startDateIndex));
  }
};

const loadWeatherForecast = async (store: MiddlewareAPI<any, ApplicationState>, startDateIndex: number) => {
  const httpConfig = store.getState().httpConfig.config;
  const dataSource = new WeatherForecastSource(httpConfig);
  store.dispatch(watherForecastActions.setLoading(true));

  const forecasts = await dataSource.fetchdata(startDateIndex);

  store.dispatch(watherForecastActions.setLoading(false));
  store.dispatch(watherForecastActions.setForcasts(forecasts));
}

const actions = 
  new ReduxCreator<WatherForecastState>('watherForecast', new WatherForecastState())
    .addReducer<any[]>((state, forecasts) => ({ ...state, forecasts }))
    .addReducer<boolean>((state, loading) => ({ ...state, loading }))
    .addEffectHandler<number>(loadWeatherForecast)
    .addLocationHandler(locationHanlder)
    .build();

export const watherForecastActions = {
  setForcasts: actions[0],
  setLoading: actions[1],
  loadWeatherForecast: actions[2]
}