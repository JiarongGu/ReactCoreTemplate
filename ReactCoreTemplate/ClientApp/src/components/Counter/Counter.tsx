import { createReducer, ReduxRegistry } from '@utils';
import * as React from 'react';
import { connect } from 'react-redux';

const increment = createReducer((state) => ++state);

ReduxRegistry.registerReducer({
  initalState: 0,
  stateName: 'count',
  reducerEvents: [ increment ]
});

@connect(
  state => ({ count: state.count }),
  dispatch => ({ increment: () => dispatch(increment.action()) })
)
export class Counter extends React.Component<any> {
  render() {
    return (
      <div>
        <h1>Counter</h1>
        <p>This is a simple example of a React component.</p>
        <p>Current count: <strong>{this.props.count}</strong></p>
        <button onClick={this.props.increment}>Increment</button>
      </div>
    )
  }
}
