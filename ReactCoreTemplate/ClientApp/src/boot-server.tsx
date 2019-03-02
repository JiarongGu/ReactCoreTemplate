import * as React from 'react';
import * as https from 'https';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { createServerRenderer, RenderResult } from 'aspnet-prerendering';
import { configureStore, processLocationTasks } from '@banbrick/redux-creator';

import { Routes } from './Routes';
import { ApplicationState } from './store';
import { AppInfoState, httpConfigActions } from './services';

import '@services';
import '@components';

export default createServerRenderer(params => {
  return new Promise<RenderResult>((resolve, reject) => {
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
    const initalState: any = { appInfo: new AppInfoState(false)};

    const store = configureStore<ApplicationState>({ initalState });

    // dispatch new http config
    store.dispatch(httpConfigActions.setHttpConfig(config));

    // load data for current url
    const initalizeTask  = processLocationTasks(store, { pathname: urlAfterBasename } as any);

    // Prepare an instance of the application and perform an inital render that will
    // cause any async tasks (e.g., data access) to begin
    const routerContext: StaticRouterContext = { url: undefined };

    const app = (
      <Provider store={store}>
        <StaticRouter basename={basename} context={routerContext} location={params.location.path}>
          <Routes />
        </StaticRouter>
      </Provider>
    );

    // If there's a redirection, just send this information back to the host application
    if (routerContext.url) {
      resolve({ redirectUrl: routerContext.url });
      return;
    }

    // Once any async tasks are done, we can perform the final render
    // We also send the redux store state, so the client can continue execution where the server left off
    Promise.all([params.domainTasks, initalizeTask]).then(() => {
      // render headers
      const head = Helmet.renderStatic();
      const headTags =
        `${head.title.toString()}\n` +
        `${head.meta.toString()}\n` +
        `${head.link.toString()}\n` +
        `${head.script.toString()}\n` +
        `${head.noscript.toString()}`;
      const state = store.getState();
      
      // delete httpconfig which be using differently in client
      delete(state.httpConfig);

      resolve({
        html: originalHtml
          .replace('<!-- body -->', renderToString(app))
          .replace('<!-- head -->', headTags)
          .replace('<!-- store -->', `<script id='preloaded-state'>window.__PRELOADED_STATE__ = ${JSON.stringify(state)}</script>`)
      });
    }, reject); // Also propagate any errors back into the host application
  });
});
