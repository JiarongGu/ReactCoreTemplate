import * as React from 'react';
import { useSink } from 'redux-sink';
import { CounterService } from './CounterService';
import { AppInfoService } from '@services';

const Counter = () => {
  const counterService: CounterService = useSink(CounterService)!;
  const appInfoService: AppInfoService = useSink(AppInfoService)!;

  return (
    <div>
      <h1>Counter - {appInfoService.state.isClient ? 'client' : 'server'}</h1>
      <p>Current Increment: <strong>{counterService.incrementCount}</strong></p>
      <p>Current Decrement: <strong>{counterService.decrementCount}</strong></p>
      <p>Current Total: <strong>{counterService.total}</strong></p>
      <p>Current Action Calls: <strong>{counterService.actions}</strong></p>
      <button onClick={() => counterService.increment(1)}>Increment</button>
      <button onClick={() => counterService.decrement(1)}>Decrement</button>
      <button onClick={() => counterService.updateAll(2, 2)}>Update All</button>
    </div>
  );
}

export default Counter;