import { matchPath } from 'react-router';

export function location(pathname) { 
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    const func = descriptor.value.bind(target);
    descriptor.value = function (location: Location) {
      const matches = matchPath(location.pathname, pathname);
      if (!matches) return;
      func(matches);
    };
    return descriptor;
  }
}