import { Location } from 'history';

export function getTranslationUrl(location: Location<any>, currentLanguage: string, newLanguage: string) {
  if(currentLanguage)
  {
    const newPathname = location.pathname.replace(currentLanguage, newLanguage);
    return newPathname + location.search;
  }
  return `/${newLanguage}${location.pathname}${location.search}`; 
}