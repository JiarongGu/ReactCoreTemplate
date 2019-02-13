import { createReducer, combineReducers } from '../../utils';

export class WatherForecastState {
  forecasts: any[];
}

const setForecasts = createReducer<WatherForecastState, any[]>((state, forecasts) => ({ ...state, forecasts }));

export const watherForecastReducer = combineReducers( new WatherForecastState(), setForecasts );
export const watherForecastActions = { setForcasts: setForecasts.action };