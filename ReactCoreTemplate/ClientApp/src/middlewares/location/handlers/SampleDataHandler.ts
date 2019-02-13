import { AnyAction } from 'redux';
import { appInfoActions } from '../../../store/appInfo';
import { LocationMiddlewareHandler } from '.';

export const SampleDataHandler: LocationMiddlewareHandler = (store, payload) => {
  const matched = layoutConfigurations.find(x => x.match.test(payload.pathname));

  return new Promise((resolve) => {
    if (matched)
      store.dispatch(matched.action);
    resolve();
  });
}

interface layoutConfiguration {
  match: RegExp;
  action: AnyAction;
}

const layoutConfigurations: layoutConfiguration[] = [
  { 
    match: /.*/,
    action: appInfoActions.setAppInfo({ logoUrl: '/urlupdate' })
  }
];