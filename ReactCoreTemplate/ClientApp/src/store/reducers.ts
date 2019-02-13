import { appInfoReducer, AppInfoState } from './appInfo';
import { watherForecastReducer, WatherForecastState } from './weatherforecast';
import { httpSourceReducer, HttpSourcesState } from './httpsources';

export const reducers = {
  appInfo: appInfoReducer,
  watherForecast: watherForecastReducer,
  httpSources: httpSourceReducer,
};

export interface ApplicationState {
  appInfo: AppInfoState;
  watherForecast: WatherForecastState;
  httpSources: HttpSourcesState;
}