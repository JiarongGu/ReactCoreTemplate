import { registerReducer, ReducerRegistration } from './redux-creators';
import { registerProcessHandler } from './redux-process-middleware';
import { registerLocationHandler } from './redux-location-middleware';
import { PromiseHandlerEvent } from './redux-handler-creators';

class ReduxRegistry {
  registerReducer<TState>(registration: ReducerRegistration<TState>): ReduxRegistry {
    registerReducer(registration);
    return this;
  }
  registerProcessHandler<TPayload>(handlerEvent: PromiseHandlerEvent<TPayload>): ReduxRegistry {
    registerProcessHandler(handlerEvent);
    return this;
  }
  registerLocationHandler(handlerEvent: PromiseHandlerEvent<Location>): ReduxRegistry {
    registerLocationHandler(handlerEvent);
    return this;
  }
}

export default new ReduxRegistry();