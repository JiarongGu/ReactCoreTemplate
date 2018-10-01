import * as React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { replace } from 'react-router-redux';
import { StaticRouterContext } from 'react-router';
import { createMemoryHistory } from 'history';
import { createServerRenderer, RenderResult } from 'aspnet-prerendering';

import { Routes } from './Routes';
import { configureStore } from '@store';
import Helmet from 'react-helmet';
import { AppInfoState } from '@store/appInfo';

export default createServerRenderer(params => {
  return new Promise<RenderResult>((resolve, reject) => {
    // Prepare Redux store with in-memory history, and dispatch a navigation event
    // corresponding to the incoming URL
    const basename = params.baseUrl.substring(0, params.baseUrl.length - 1); // Remove trailing slash
    const urlAfterBasename = params.url.substring(basename.length);

    const store = configureStore(createMemoryHistory(), { 
      appInfo: new AppInfoState(false)
    } as any);
    const document = params.data.originalHtml;

    store.dispatch(replace(urlAfterBasename));

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

    const head = Helmet.renderStatic();
    const headTags =
      `${head.title.toString()}\n` +
      `${head.meta.toString()}\n` +
      `${head.link.toString()}\n` +
      `${head.script.toString()}\n` +
      `${head.noscript.toString()}`;

    // Once any async tasks are done, we can perform the final render
    // We also send the redux store state, so the client can continue execution where the server left off
    params.domainTasks.then(() => {
      resolve({
        html: document
          .replace('<!-- body -->', renderToString(app))
          .replace('<!-- head -->', headTags)
          //.replace('<header-holder />', headTags)
        //globals: { initialReduxState: store.getState() }
      });
    }, reject); // Also propagate any errors back into the host application
  });
});
