

import { state, sink, reducer, effect } from 'redux-sink';

@sink('counterService')
export class CounterService {
  @state
  state = { 
    increment: 0, 
    decrement: 0, 
    total: 0 
  };

  offset = 0

  @reducer
  setState(state: any) {
    return {...state};
  }

  @effect
  increment(value: number) {
    this.offset++;
    const increase = value + this.offset;
    const increment = this.state.increment + increase;
    const total = this.state.total + increase;
    this.setState({ ...this.state, increment, total });
  }

  @effect
  decrement(value: number) {
    this.offset--;
    const decrease = value + this.offset;
    const decrement = this.state.decrement - decrease;
    const total = this.state.total - decrease;
    this.setState({ ...this.state, decrement, total });
  }

  @effect
  incrementall(values: Array<number>) {
    const total = this.state.total + values.reduce((a, b) => a + b, 0);
    this.setState({ ...this.state, total });
  }

  @effect
  updateAll(value: number) {
    this.decrement(value);
    this.increment(value);
  }
}