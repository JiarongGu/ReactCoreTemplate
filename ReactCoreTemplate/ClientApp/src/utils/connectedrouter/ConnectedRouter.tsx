import * as React from 'react';
import { Store } from 'redux';
import { Router } from 'react-router';
import { History, UnregisterCallback } from 'history';

export class ConnectedRouter extends React.Component<{history: History, store: Store<any>}> {
  unregisterListener?: UnregisterCallback;

  onLocationChange = (location) => {
    this.props.store.dispatch({ 
      type:'@@router/LOCATION_CHANGE', 
      payload: location 
    });
  }

  componentWillMount() {
    if(this.props.store.getState().appInfo.isClient)
      this.onLocationChange(this.props.history.location);
    this.unregisterListener = this.props.history.listen(this.onLocationChange);
  }

  componentWillUnmount() {
    if (this.unregisterListener)
      this.unregisterListener();
  }

  render() {
    return (<Router history={this.props.history}>{this.props.children}</Router>)
  }
}