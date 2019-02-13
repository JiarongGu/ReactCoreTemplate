import { createRedux, createReducer } from '../../utils';

export class WatherForecastState {
  forecasts: any[];
}

const setForecasts = createRedux<WatherForecastState, any[]>((state, forecasts) => ({ ...state, forecasts }));

export const watherForecastReducer = createReducer( new WatherForecastState(), setForecasts );
export const watherForecastActions = { setForcasts: setForecasts.action };