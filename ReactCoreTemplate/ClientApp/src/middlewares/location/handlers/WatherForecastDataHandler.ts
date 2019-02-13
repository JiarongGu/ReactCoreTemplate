import { LocationMiddlewareHandler } from '.';
import { watherForecastActions } from '@store/weatherforecast';
import { matchPath } from 'react-router';
import { ApplicationState } from '@store/reducers';

export const WatherForecastDataHandler: LocationMiddlewareHandler = async (store, payload) => {
  var matches = matchPath(payload.pathname,  { path: '/fetchdata/:startDateIndex?'});
  if (matches) {
    const httpSource = (store.getState() as ApplicationState).httpSources;
    const forecasts = await httpSource.watherForecasts.fetchdata((matches.params as any).startDateIndex);
    store.dispatch(watherForecastActions.setForcasts(forecasts));
  }
}