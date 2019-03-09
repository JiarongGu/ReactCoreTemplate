import * as React from 'react';
import { connectService } from '@banbrick/redux-creator/lib/redux-service';
import { CounterService, IncrementService, DecrementService } from './CounterService';

const service = connectService as any;

@service(IncrementService)
@service(DecrementService)
@service(CounterService)
export default class Counter extends React.Component<any> {
  render() {
    //const counterService: CounterService = this.props.CounterService;
    const incrementService: IncrementService = this.props.IncrementService;
    const decrementService: DecrementService = this.props.DecrementService;
    const counterService: CounterService = this.props.CounterService;

    return (
      <div>
        <h1>Counter</h1>
        <p>This is a simple example of a React component.</p>
        <p>Current Increment: <strong>{incrementService.state}</strong></p>
        <p>Current Decrement: <strong>{decrementService.state}</strong></p>
        <button onClick={incrementService.increment}>Increment</button>
        <button onClick={decrementService.decrement}>Decrement</button>
        <button onClick={counterService.updateAll}>Update All</button>
      </div>
    )
  }
}