

import { state, sink, effect, trigger } from 'redux-sink';
import { AppInfoService } from '@services';

@sink('counterService')
export class CounterService {
  @state
  incrementCount = 0;
  
  @state
  decrementCount = 0;
  
  @state
  total = 0;
  
  @state
  actions = 0;

  offset = 0
  appInfo = new AppInfoService();
  
  @effect
  increment(value: number) {
    this.offset++;
    const increase = value + this.offset;
    this.incrementCount = this.incrementCount + increase;
    this.total = this.total + increase;
  }

  @effect
  decrement(value: number) {
    this.offset--;
    const decrease = value + this.offset;
    this.incrementCount = this.incrementCount - decrease;
    this.total = this.total - decrease;
  }

  @effect
  incrementall(values: Array<number>) {
    this.total = this.total + values.reduce((a, b) => a + b, 0);
  }

  @effect
  updateAll(increment: number, decrement: number) {
    this.decrement(decrement);
    this.increment(increment);
  }

  @trigger('counterService/decrement')
  @trigger('counterService/increment')
  actionCounter(first: number, second: number) {
    console.log(first, second);
    this.actions ++;
  }
}