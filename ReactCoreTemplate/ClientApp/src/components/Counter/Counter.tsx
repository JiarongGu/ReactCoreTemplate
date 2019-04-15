import * as React from 'react';
import { sinking } from 'redux-sink';
import { CounterService } from './CounterService';
import { AppInfoService } from '@services';
import Helmet from 'react-helmet';

@sinking(CounterService, AppInfoService)
class Counter extends React.PureComponent<any> {
  render() {
    const counterService: CounterService = this.props.counterService;
    const appInfoService: AppInfoService = this.props.appInfoService;
    return (
      <div>
        <Helmet>
          <title>ReactCoreTemplate - Counter</title>
        </Helmet>
        <h1>Counter - {appInfoService.state.isClient ? 'client' : 'server'}</h1>
        <p>Current Increment: <strong>{counterService.incrementCount}</strong></p>
        <p>Current Decrement: <strong>{counterService.decrementCount}</strong></p>
        <p>Current Total: <strong>{counterService.total}</strong></p>
        <p>Current Action Calls: <strong>{counterService.actions}</strong></p>
        <button onClick={() => counterService.increment(2)}>Increment</button>
        <button onClick={() => counterService.decrement(2)}>Decrement</button>
        <button onClick={() => counterService.updateAll(2, 2)}>Update All</button>
      </div>
    )
  }
}

export default Counter;