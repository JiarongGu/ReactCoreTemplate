import * as React from 'react';
import { connect } from '@banbrick/redux-creator';
import { CounterService } from './CounterService';

@connect(CounterService)
class Counter extends React.PureComponent<any> {
  render() {
    const counterService: CounterService = this.props.counterService;
    console.log('counter render');
    return (
      <div>
        <h1>Counter</h1>
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