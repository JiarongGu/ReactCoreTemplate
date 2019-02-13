import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApplicationState } from '@store/reducers';

class FetchData extends React.Component<any> {
  render() {
    const { forecasts, match: { params: { startDateIndex } } } = this.props;
    const prevStartDateIndex = parseInt(startDateIndex || 0) - 5;
    const nextStartDateIndex = parseInt(startDateIndex || 0) + 5;
    return (
      <div>
        <h1>Weather forecast</h1>
        <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
        {forecasts && 
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
        <p className='clearfix text-center'>
          <p><Link to={`/fetchdata/${prevStartDateIndex}`}>Previous</Link></p>
          <p><Link to={`/fetchdata/${nextStartDateIndex}`}>Next</Link></p>
        </p>
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({ forecasts: state.watherForecast.forecasts })
)(FetchData);
