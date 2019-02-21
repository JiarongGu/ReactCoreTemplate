import { PromiseHandler, createPromiseHandler, PromiseHandlerEvent } from './redux-handler-creators';
import { ReducerHandler, registerEffectEvent, registerLocationEvent } from '.';
import { createReducer, IReducerEvent, registerReducer } from './redux-creators';

export class ReduxCreator<TState> {
  private namespace: string;
  private initalState: TState;
  private actions: { [key: string]: any };
  private reducerEvents: Array<IReducerEvent<TState, any>>;
  private effectEvents: Array<PromiseHandlerEvent<any>>;
  private locationEvents: Array<PromiseHandlerEvent<Location>>;

  constructor(namespace: string, initalState: TState) {
    this.namespace = namespace;
    this.initalState = initalState;

    this.actions = {};
    this.reducerEvents = [];
    this.effectEvents = [];
    this.locationEvents = [];
  }

  addReducer<TPayload>(handler: ReducerHandler<TState, TPayload>, actionName?: string, messageType?: string): ReduxCreator<TState> {
    const event = createReducer(handler, messageType);
    this.reducerEvents.push(event);
    
    if(actionName)
      this.actions[actionName] = event.action;
    return this;
  }

  addEffectHandler<TPayload>(handler: PromiseHandler<TPayload>, actionName?: string, messageType?: string): ReduxCreator<TState>  {
    const event = createPromiseHandler(handler, messageType);
    this.effectEvents.push(event);

    if(actionName)
      this.actions[actionName] = event.action;
    return this;
  }

  addLocationHandler(handler: PromiseHandler<Location>, messageType?: string): ReduxCreator<TState>  {
    const event = createPromiseHandler(handler, messageType);
    this.locationEvents.push(event);
    return this;
  }

  build() {
    registerReducer({
      stateName: this.namespace,
      initalState: this.initalState,
      reducerEvents: this.reducerEvents
    });
    
    this.effectEvents.forEach(x => {
      registerEffectEvent(x);
    });

    this.locationEvents.forEach(x => {
      registerLocationEvent(x);
    });

    return this.actions;
  }
}

