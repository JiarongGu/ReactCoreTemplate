import Loadable from 'react-loadable';
import * as React from 'react';

export const WeatherForecast = Loadable({
  loader: () => import('./WeatherForecast'),
  loading: () => (<div>loading...</div>),
});