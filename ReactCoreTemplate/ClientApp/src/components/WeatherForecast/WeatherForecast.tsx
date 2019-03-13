import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from '@banbrick/redux-creator';
import { WatherForecastService } from './watherForecastServices';
import styles from './watherForecast.module.scss';

@connect(WatherForecastService)
export default class WeatherForecast extends React.PureComponent<any> {
  render() {
    const watherForecast = this.props.watherForecast as WatherForecastService;
    const loading = watherForecast.state.loading;
    const loadedForecast = !loading && watherForecast.state.forecasts;
    const error = watherForecast.state.error;

    console.log(watherForecast.state);


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
              {watherForecast.state.forecasts.map(forecast =>
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
        <p><Link to={`/weather-forecast/${watherForecast.state.index - 5}`}>Previous</Link></p>
        <p><Link to={`/weather-forecast/${watherForecast.state.index + 5}`}>Next</Link></p>
      </div>
    );
  }
}