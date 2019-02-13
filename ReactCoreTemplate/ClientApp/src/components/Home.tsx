import * as React from 'react';
import { Link } from 'react-router-dom';

export const Home = props => (
  <div>
    <h1>Hello, world!</h1>
    <p>Welcome to your new single-page application, built with: .net core</p>
    <p><Link to={'counter'}>Go Counter</Link></p>
    <p><Link to={'fetchData'}>Go Fetch Data</Link></p>
  </div>
);