import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Home } from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';

export const Routes = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
  </Switch>
);
