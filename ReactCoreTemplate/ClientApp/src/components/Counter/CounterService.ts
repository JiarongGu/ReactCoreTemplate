import { ReduxService, begin, prop, reducer, effect } from '@banbrick/redux-creator';

export class IncrementService extends ReduxService<number> {
  @begin
  defaultstate() { return 0; }

  @reducer
  increment() {
    return this.state + 1;
  }
}

export class DecrementService extends ReduxService<number> {
  @begin
  defaultstate() { return 0; }

  @reducer
  decrement() {
    return this.state - 1;
  }
}

export class CounterService extends ReduxService<any> {
  @prop(new IncrementService())
  incrementService!: IncrementService;

  @prop(new DecrementService())
  decrementService!: DecrementService;

  @effect
  updateAll() {
    this.incrementService.increment();
    this.decrementService.decrement();
  }
}