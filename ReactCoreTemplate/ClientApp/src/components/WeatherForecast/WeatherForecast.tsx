import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { WatherForecastState } from './watherForecastServices';
import './watherForecastServices';

@connect(
  (state: { watherForecast: WatherForecastState }) => (
    { 
      forecasts: state.watherForecast.forecasts,
      loading: state.watherForecast.loading
    }
  )
)
export default class WeatherForecast extends React.Component<any> {
  render() {
    const { forecasts, loading, match: { params: { startDateIndex } } } = this.props;
    const prevStartDateIndex = parseInt(startDateIndex || 0) - 5;
    const nextStartDateIndex = parseInt(startDateIndex || 0) + 5;
    
    return (
      <div>
        <h1>Weather forecast</h1>
        <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
        {!!loading && <p>loading forecasts...</p> }
        {!loading && forecasts &&
          <table className='table'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Temp. (C)</th>
                <th>Temp. (F)</th>
                <th>Summary</th>
              </tr>
            </thead>
            <tbody>
              {forecasts.map(forecast =>
                <tr key={forecast.dateFormatted}>
                  <td>{forecast.dateFormatted}</td>
                  <td>{forecast.temperatureC}</td>
                  <td>{forecast.temperatureF}</td>
                  <td>{forecast.summary}</td>
                </tr>
              )}
            </tbody>
          </table>
        }
        <p><Link to={`/weather-forecast/${prevStartDateIndex}`}>Previous</Link></p>
        <p><Link to={`/weather-forecast/${nextStartDateIndex}`}>Next</Link></p>
      </div>
    );
  }
}