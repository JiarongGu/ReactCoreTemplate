import Loadable from 'react-loadable';
import * as React from 'react';

export const Counter = Loadable({
  loader: () => import('./Counter'),
  loading: () => (<div>loading...</div>),
});