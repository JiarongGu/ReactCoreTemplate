import * as React from 'react';
import { Link } from 'react-router-dom';
import { sinking } from 'redux-sink';
import { WeatherForecastSink } from './WeatherForecastSink';
import styles from './weatherForecast.module.scss';

@sinking(WeatherForecastSink)
export default class WeatherForecast extends React.PureComponent<any> {
  render() {
    const weatherForecastSink = this.props.weatherForecastSink as WeatherForecastSink;
    const loading = weatherForecastSink.state.loading;
    const loadedForecast = !loading && weatherForecastSink.state.forecasts;
    const error = weatherForecastSink.state.error;
    return (
      <div className={styles.container}>
        <h1>Weather forecast</h1>
        <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
        {loading && <p>loading forecasts...</p>}
        {error && <p>{error.message}</p>}
        {loadedForecast &&
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
              {weatherForecastSink.state.forecasts.map(forecast =>
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
        <p><Link to={`/weather-forecast/${weatherForecastSink.state.index - 5}`}>Previous</Link></p>
        <p><Link to={`/weather-forecast/${weatherForecastSink.state.index + 5}`}>Next</Link></p>
      </div>
    );
  }
}