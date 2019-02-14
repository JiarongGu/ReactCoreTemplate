import * as uuid from 'uuid';
import { LocationMiddlewareHandler } from '../shared';

const locationHandlerCollection = { }

export function registerLocationHandler(locationHandler: LocationMiddlewareHandler, name?: string): string {
  const hanlderName = name || uuid.v4();
  locationHandlerCollection[hanlderName] = locationHandler;
  return hanlderName;
}

export function removeLocationHandler(name: string): boolean {
  return delete(locationHandlerCollection[name]);
}

export function getLocationHandlers() {
  return locationHandlerCollection;
}