
import { createBrowserHistory, History, Location } from 'history';
import { sink, SinkFactory, state } from 'redux-sink';


@sink('navigation')
export class NavigationSink {
  @state public history!: History;
  @state public location!: Location;
}

export const createNavigationHistory = () => {
  const history = createBrowserHistory();
  const navigation = SinkFactory.getSink(NavigationSink);

  history.listen((location) => navigation.location = location);
  navigation.history = history;
  navigation.location = history.location;
  
  return history;
}