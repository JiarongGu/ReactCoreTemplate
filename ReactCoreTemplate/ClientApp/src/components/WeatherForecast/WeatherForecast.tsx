import * as React from 'react';
import { Link } from 'react-router-dom';
import { sinking } from 'redux-sink';
import { WeatherForecastSink } from './WeatherForecastSink';

@sinking(WeatherForecastSink)
export default class WeatherForecast extends React.PureComponent<any> {
  render() {
    const weatherForecast = this.props.weatherForecastSink as WeatherForecastSink;
    return (
      <div>
        <h1>Weather forecast</h1>
        <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
        {weatherForecast.loading && <p>loading forecasts...</p>}
        {weatherForecast.error && <p>{weatherForecast.error.message}</p>}
        {weatherForecast.forecasts &&
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
              {weatherForecast.forecasts.map(forecast =>
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
        <p><Link to={`/weather-forecast/${weatherForecast.index - 5}`}>Previous</Link></p>
        <p><Link to={`/weather-forecast/${weatherForecast.index + 5}`}>Next</Link></p>
      </div>
    );
  }
}