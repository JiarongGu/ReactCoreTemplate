

import { state, sink, effect, trigger } from 'redux-sink';
import { AppInfoService } from '@services';

@sink('counter')
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
    const increase = value + this.offset;
    this.offset++;
    this.incrementCount = this.incrementCount + increase;
    this.total = this.total + increase;
  }

  @effect
  decrement(value: number) {
    const decrease = value + this.offset;
    this.offset--;
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

  @trigger('counter/decrement')
  @trigger('counter/increment')
  actionCounter() {
    this.actions ++;
  }
}