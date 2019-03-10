import * as React from 'react';
import { connect } from '@banbrick/redux-creator';
import { state, service, reducer, effect } from '@banbrick/redux-creator';

@service('CounterService')
export class CounterService {
  @state
  state = { 
    increment: 0, 
    decrement: 0, 
    total: 0 
  };

  @reducer
  increment(value: number) {
    const increment = this.state.increment + value;
    const total = this.state.total + value;
    return { ...this.state, increment, total };
  }

  @reducer
  decrement(value: number) {
    const decrement = this.state.decrement - value;
    const total = this.state.total - value;
    return { ...this.state, decrement, total };
  }

  @effect
  updateAll(value: number) {
    this.decrement(value);
    this.increment(value);
  }
}

@connect(CounterService)
class Counter extends React.Component<{ name: string }> {
  buttonRef= React.createRef<HTMLButtonElement>();
  componentDidMount() {
    console.log(this.buttonRef.current);
  }
  
  render() {
    const counterService: CounterService = (this.props as any).CounterService;
    return (
      <div>
        <h1>Counter {this.props.name}</h1>
        <p>This is a simple example of a React component.</p>
        <p>Current Increment: <strong>{counterService.state.increment}</strong></p>
        <p>Current Decrement: <strong>{counterService.state.decrement}</strong></p>
        <p>Current Total: <strong>{counterService.state.total}</strong></p>
        <button onClick={() => counterService.increment(2)}>Increment</button>
        <button onClick={() => counterService.decrement(2)}>Decrement</button>
        <button ref={this.buttonRef} onClick={() => counterService.updateAll(1)}>Update All</button>
      </div>
    )
  }
}

const Test = () => <Counter name={'new counter hahaha'} />

export default Test;