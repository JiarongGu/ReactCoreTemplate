import * as React from 'react';
import * as https from 'https';
import Loadable from 'react-loadable';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { createServerRenderer, RenderResult, BootFuncParams } from 'aspnet-prerendering';
import { SinkFactory } from 'redux-sink';
import { AppInfoState, httpConfigService } from './services';
import { Routes } from './components';

export default createServerRenderer(async (params: BootFuncParams): Promise<RenderResult> => {
  // Prepare Redux store with in-memory history, and dispatch a navigation event
  // corresponding to the incoming URL
  const basename = params.baseUrl.substring(0, params.baseUrl.length - 1); // Remove trailing slash
  const urlAfterBasename = params.url.substring(basename.length);

  // Server supplyData
  const host = params.data.host;
  const originalHtml = params.data.originalHtml;

  // Parpare store
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });
  const config = { baseURL: host, httpsAgent };
  const preloadedState: any = { appInfoService: new AppInfoState(false) };

  const store = SinkFactory.createStore({ preloadedState });

  // dispatch new http config
  httpConfigService.config = config;

  // load all chunk components
  await Loadable.preloadAll();

  // Prepare an instance of the application and perform an inital render that will
  const routerContext: StaticRouterContext = { url: undefined };

  const app = (
    <Provider store={store}>
      <StaticRouter basename={basename} context={routerContext} location={params.location.path}>
        <Routes />
      </StaticRouter>
    </Provider>
  );

  const locationAction = {
    type: '@@router/LOCATION_CHANGE',
    payload: { location: { pathname: urlAfterBasename } }
  };

  // process location tasks
  await SinkFactory.activeTrigger(locationAction);

  // ensure all effect task completed
  await Promise.all(SinkFactory.effectTasks);

  // load data for current url
  await params.domainTasks;

  // If there's a redirection, just send this information back to the host application
  if (routerContext.url) {
    return ({ redirectUrl: routerContext.url });
  }

  // render headers
  const header = Helmet.renderStatic();
  const headerTags =
    `${header.title.toString()}\n` +
    `${header.meta.toString()}\n` +
    `${header.link.toString()}\n` +
    `${header.script.toString()}\n` +
    `${header.noscript.toString()}`;
  const state = store.getState();

  return ({
    html: originalHtml
      .replace(holderTag('body'), renderToString(app))
      .replace(holderTag('header'), headerTags)
      .replace(holderTag('store'), `<script id='preloaded-state'>window.__PRELOADED_STATE__ = ${JSON.stringify(state)}</script>`)
  });
});

function holderTag(holder: string) {
  return `<script holder="${holder}"></script>`;
}