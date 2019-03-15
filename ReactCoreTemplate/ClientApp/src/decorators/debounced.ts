import _debounced from 'lodash/debounce';

export function debounced(wait: number, option?: any) {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    descriptor.value = _debounced(descriptor.value, wait, option);
  }
}