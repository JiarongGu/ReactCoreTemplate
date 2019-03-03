import { matchPath } from 'react-router';
import { WeatherForecastSource } from './WatherForecastSource';
import { ApplicationState } from '@store';
import { MiddlewareAPI } from 'redux';
import { Location } from 'history';
import { ReduxCreator } from '@banbrick/redux-creator';

export class WatherForecastState {
  forecasts: any[] = [];
  loading: boolean = false;
}

// create reducer actions
const reducerActions = 
  new ReduxCreator<WatherForecastState>('watherForecast', new WatherForecastState())
    .addReducer<any[]>((state, forecasts) => ({ ...state, forecasts }), 'setForcasts')
    .addReducer<boolean>((state, loading) => ({ ...state, loading }), 'setLoading')
    .build();

// create load effect
const loadWeatherForecast = async (store: MiddlewareAPI<any, ApplicationState>, startDateIndex: number) => {
  const httpConfig = store.getState().httpConfig.config;
  const dataSource = new WeatherForecastSource(httpConfig);
  store.dispatch(reducerActions.setLoading(true));
  const forecasts = await dataSource.fetchdata(startDateIndex);
  store.dispatch(reducerActions.setLoading(false));
  store.dispatch(reducerActions.setForcasts(forecasts));
}

const effectActions = 
  new ReduxCreator<WatherForecastState>()
    .addEffectHandler(loadWeatherForecast, 'loadWeatherForecast')
    .build();

// add location handler
const locationHanlder = async (store: MiddlewareAPI<any, ApplicationState>, location: Location) => {
  var matches = matchPath(location.pathname,  { path: '/weather-forecast/:startDateIndex?'});
  if (matches) {
    const startDateIndex = (matches.params as any).startDateIndex;
    // dispatch effect
    store.dispatch(effectActions.loadWeatherForecast(startDateIndex));
  }
};

new ReduxCreator<WatherForecastState>()
  .addLocationHandler(locationHanlder)
  .build();

// export actions
export const watherForecastActions = {
  setForcasts: reducerActions.setForcasts,
  setLoading: reducerActions.setLoading,
  loadWeatherForecast: effectActions.loadWeatherForecast
}