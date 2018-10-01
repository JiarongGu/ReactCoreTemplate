import { appInfoReducer, AppInfoState } from '@store/appInfo';
// import { authenticationReducer, AuthenticationState } from '@store/authentication';
// import { searchReducer, SearchState } from '@store/search';

export const reducers = {
  appInfo: appInfoReducer,
  // authentication: authenticationReducer,
  // search: searchReducer
};

export interface ApplicationState {
  appInfo: AppInfoState;
  // authentication: AuthenticationState;
  // search: SearchState;
}