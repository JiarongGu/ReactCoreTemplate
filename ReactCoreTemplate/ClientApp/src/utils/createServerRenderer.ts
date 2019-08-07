import * as url from 'url';

export interface BootModuleInfo {
  moduleName: string;
  exportName?: string;
  webpackConfig?: string;
}

export interface RenderToStringFunc {
  (
    callback: RenderToStringCallback,
    applicationBasePath: string, 
    bootModule: BootModuleInfo, 
    absoluteRequestUrl: string, 
    requestPathAndQuery: string, 
    customDataParameter: any, 
    overrideTimeoutMilliseconds: number, 
    requestPathBase: string
  ): void;
}

export interface RenderToStringCallback {
  (error: any, result?: RenderResult): void;
}

export interface RenderToStringResult {
  html: string;
  statusCode?: number;
  globals?: {
    [key: string]: any;
  };
}

export interface RedirectResult {
  redirectUrl: string;
}

export declare type RenderResult = RenderToStringResult | RedirectResult;

export interface BootFuncParams {
  location: any;
  origin: string;
  url: string;
  baseUrl: string;
  absoluteUrl: string;
  data: any;
}

export interface BootFunc {
  (params: BootFuncParams): Promise<RenderResult>;
}

const defaultTimeoutMilliseconds = 30 * 1000;

const getTimeoutError = (timeoutMilliseconds, moduleName) =>  
  `Prerendering timed out after ${timeoutMilliseconds}ms because the boot function in '${moduleName}' `
+ 'returned a promise that did not resolve or reject. Make sure that your boot function always resolves or rejects its promise.';

export function createServerRenderer(bootFunc: BootFunc): RenderToStringFunc {
  const resultFunc = (callback: RenderToStringCallback, applicationBasePath: string, bootModule: BootModuleInfo, absoluteRequestUrl: string, requestPathAndQuery: string, customDataParameter: any, overrideTimeoutMilliseconds: number, requestPathBase: string) => {
    // Prepare a promise that will represent the completion of all domain tasks in this execution context.
    // The boot code will wait for this before performing its final render.

    const parsedAbsoluteRequestUrl = url.parse(absoluteRequestUrl);
    const params: BootFuncParams = {
      // It's helpful for boot funcs to receive the query as a key-value object, so parse it here
      // e.g., react-redux-router requires location.query to be a key-value object for consistency with client-side behaviour
      location: url.parse(requestPathAndQuery, /* parseQueryString */ true),
      origin: parsedAbsoluteRequestUrl.protocol + '//' + parsedAbsoluteRequestUrl.host,
      url: requestPathAndQuery,
      baseUrl: (requestPathBase || '') + '/',
      absoluteUrl: absoluteRequestUrl,
      data: customDataParameter
    };

    const bootFuncPromise = bootFunc(params);
    
    if (!bootFuncPromise || typeof bootFuncPromise.then !== 'function') {
      callback(`Prerendering failed because the boot function in ${bootModule.moduleName} did not return a promise.`, undefined);
      return;
    }

    const timeoutMilliseconds = overrideTimeoutMilliseconds || defaultTimeoutMilliseconds; // e.g., pass -1 to override as 'never time out'
    const bootFuncPromiseWithTimeout = wrapWithTimeout(bootFuncPromise, timeoutMilliseconds, getTimeoutError(timeoutMilliseconds, bootModule.moduleName));

    // Actually perform the rendering
    bootFuncPromiseWithTimeout.then(successResult => {
      callback(null, successResult);
    }, error => {
      callback(error, undefined);
    });
  };

  // Indicate to the prerendering code bundled into Microsoft.AspNetCore.SpaServices that this is a serverside rendering
  // function, so it can be invoked directly. This flag exists only so that, in its absence, we can run some different
  // backward-compatibility logic.
  resultFunc['isServerRenderer'] = true;

  return resultFunc;
}

function wrapWithTimeout<T>(promise: Promise<T>, timeoutMilliseconds: number, timeoutRejectionValue: any): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timeoutTimer = setTimeout(() => {
      reject(timeoutRejectionValue);
    }, timeoutMilliseconds);

    promise.then(
      resolvedValue => {
        clearTimeout(timeoutTimer);
        resolve(resolvedValue);
      },
      rejectedValue => {
        clearTimeout(timeoutTimer);
        reject(rejectedValue);
      }
    )
  });
}