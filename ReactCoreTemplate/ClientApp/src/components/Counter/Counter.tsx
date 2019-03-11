import * as React from 'react';
import { connect } from '@banbrick/redux-creator';
import { CounterService } from './CounterService';
import { AppInfoService } from '@services';
import Helmet from 'react-helmet';

@connect(CounterService, AppInfoService)
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
        <p>Current Increment: <strong>{counterService.state.increment}</strong></p>
        <p>Current Decrement: <strong>{counterService.state.decrement}</strong></p>
        <p>Current Total: <strong>{counterService.state.total}</strong></p>
        <button onClick={() => counterService.increment(2)}>Increment</button>
        <button onClick={() => counterService.decrement(2)}>Decrement</button>
      </div>
    )
  }
}

export default Counter;