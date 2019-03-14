

import { state, sink, reducer, effect } from 'redux-sink';

@sink('counterService')
export class CounterService {
  @state
  state = { 
    increment: 0, 
    decrement: 0, 
    total: 0 
  };

  @reducer
  setState(state: any) {
    return {...state};
  }

  @effect
  increment(value: number) {
    const increment = this.state.increment + value;
    const total = this.state.total + value;
    this.setState({ ...this.state, increment, total });
  }

  @effect
  decrement(value: number) {
    const decrement = this.state.decrement - value;
    const total = this.state.total - value;
    this.setState({ ...this.state, decrement, total });
  }

  @effect
  updateAll(value: number) {
    this.decrement(value);
    this.increment(value);
  }
}