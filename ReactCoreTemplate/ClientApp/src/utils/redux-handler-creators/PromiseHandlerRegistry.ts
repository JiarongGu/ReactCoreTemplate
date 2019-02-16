import { PromiseHandler, PromiseHandlerEvent } from './createPromiseHandler';

export class PromiseHandlerRegistry<TPayload> {
  promiseHandlerMap: { [key: string]: PromiseHandler<TPayload> } = { }

  registerHandler = (...handlerEvents: PromiseHandlerEvent<TPayload>[]) => {
    handlerEvents.forEach(handlerEvent => {
      this.promiseHandlerMap[handlerEvent.action.toString()] = handlerEvent.handler;
    });
  }

  removeHandler = (name: string): boolean => {
    return delete(this.promiseHandlerMap[name]);
  }

  getHandlers = () => {
    return this.promiseHandlerMap;
  }
}