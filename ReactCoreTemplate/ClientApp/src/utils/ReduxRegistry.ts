import { registerReducer, ReducerRegistration } from './redux-creators';
import { registerProcessHandler } from './redux-process-middleware';
import { registerLocationHandler } from './redux-location-middleware';
import { PromiseHandlerEvent } from './redux-handler-creators';

class ReduxRegistry {
  registerReducer<TState>(registration: ReducerRegistration<TState>): ReduxRegistry {
    registerReducer(registration);
    return this;
  }
  registerProcessHandler<TPayload>(...handlerEvents: PromiseHandlerEvent<TPayload>[]): ReduxRegistry {
    registerProcessHandler(...handlerEvents);
    return this;
  }
  registerLocationHandler<Location>(...handlerEvents: PromiseHandlerEvent<Location>[]): ReduxRegistry {
    registerLocationHandler(...handlerEvents as any);
    return this;
  }
}

export default new ReduxRegistry();