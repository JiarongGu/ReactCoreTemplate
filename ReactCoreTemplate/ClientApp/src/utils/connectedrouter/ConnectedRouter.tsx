import * as React from 'react';
import { Store } from 'redux';
import { Router } from 'react-router';
import { History, UnregisterCallback } from 'history';

export class ConnectedRouter extends React.PureComponent<{history: History, store: Store<any>, dispatchOnMount?: boolean }> {
  unregisterListener?: UnregisterCallback;

  dispathLocationChange = (location) => {
    this.props.store.dispatch({ 
      type:'@@router/LOCATION_CHANGE', 
      payload: location 
    });
  }

  componentWillMount() {
    if(this.props.dispatchOnMount) { 
      this.dispathLocationChange(this.props.history.location);
    }
      
    this.unregisterListener = this.props.history.listen(this.dispathLocationChange);
  }

  componentWillUnmount() {
    if (this.unregisterListener)
      this.unregisterListener();
  }

  render() {
    return (<Router history={this.props.history}>{this.props.children}</Router>)
  }
}