import * as React from 'react';
import { Store } from 'redux';
import { Router } from 'react-router';
import { History, UnregisterCallback } from 'history';

export class ConnectedRouter extends React.Component<{history: History, store: Store<any>}> {
  unRegisterListener: UnregisterCallback;

  onLocationChange = (location) => {
    this.props.store.dispatch({ 
      type:'@@router/LOCATION_CHANGE', 
      payload: location 
    });
  }

  componentWillMount() {
    this.onLocationChange(this.props.history.location);
    this.unRegisterListener = this.props.history.listen(this.onLocationChange);
  }

  componentWillUnmount() {
    this.unRegisterListener();
  }

  render() {
    return (<Router history={this.props.history}>{this.props.children}</Router>)
  }
}