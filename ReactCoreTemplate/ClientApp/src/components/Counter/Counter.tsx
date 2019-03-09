import * as React from 'react';
import { connect } from '@banbrick/redux-creator';
import { state, service, reducer, effect } from '@banbrick/redux-creator';

@service
export class IncrementService {
  @state
  state = 0;

  @reducer
  increment() {
    return this.state + 1;
  }
}

@service
export class CounterService {
  @state
  state = 0;

  incrementService = new IncrementService();

  @reducer
  decrement() {
    return this.state - 1;
  }

  @effect
  updateAll() {
    this.decrement();
    this.incrementService.increment();
  }
}

@connect(IncrementService, CounterService)
export default class Counter extends React.Component<any> {
  render() {
    //const counterService: CounterService = this.props.CounterService;
    const incrementService: IncrementService = this.props.IncrementService;
    const counterService: CounterService = this.props.CounterService;

    return (
      <div>
        <h1>Counter</h1>
        <p>This is a simple example of a React component.</p>
        <p>Current Increment: <strong>{incrementService.state}</strong></p>
        <p>Current Decrement: <strong>{counterService.state}</strong></p>
        <button onClick={incrementService.increment}>Increment</button>
        <button onClick={counterService.decrement}>Decrement</button>
        <button onClick={counterService.updateAll}>Update All</button>
      </div>
    )
  }
}

const Test = () => <Counter />