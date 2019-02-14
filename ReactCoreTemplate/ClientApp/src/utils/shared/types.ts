import { MiddlewareAPI } from 'redux';

export interface Action<Payload> {
  type: string;
  payload?: Payload;
  error?: boolean;
}

export interface Action<Payload> {
  type: string;
  payload?: Payload;
  error?: boolean;
}

export type Reducer<TState, TPayload> = (state: TState, action: Action<TPayload>) => TState;
export type ActionFunction0Base<R> = () => R;
export type ActionFunction1Base<T1, R> = (t1: T1) => R;
export type ActionFunction2Base<T1, T2, R> = (t1: T1, t2: T2) => R;
export type ActionFunction3Base<T1, T2, T3, R> = (t1: T1, t2: T2, t3: T3) => R;
export type ActionFunction4Base<T1, T2, T3, T4, R> = (t1: T1, t2: T2, t3: T3, t4: T4) => R;

export type ActionFunction1<T1> = ActionFunction1Base<T1, Action<T1>>;
export type ActionFunctionAny<R> = (...args: any[]) => R;

export type LocationMiddlewareHandler = (store: MiddlewareAPI<any>, payload: any) => Promise<any>;