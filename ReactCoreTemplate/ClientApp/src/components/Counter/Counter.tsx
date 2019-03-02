
import * as React from 'react';
import { connect } from 'react-redux';
import { ReduxCreator } from '@banbrick/redux-creator';

const actions = new ReduxCreator<number>('count', 0)
  .addReducer((state) => ++state, 'increment')
  .build();

@connect(
  state => ({ count: state.count }),
  dispatch => ({ increment: () => dispatch(actions.increment()) })
)
export default class Counter extends React.Component<any> {
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
