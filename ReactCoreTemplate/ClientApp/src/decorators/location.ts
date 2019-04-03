import { matchPath } from 'react-router';

export function location(pathname) { 
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    const locationFunction = descriptor.value;
    descriptor.value = async function ({ location, isFirstRendering }) {
      const matches = matchPath(location.pathname, pathname);
      if (!matches || isFirstRendering) 
        return;
      return await locationFunction.call(this, matches);
    };
  }
}